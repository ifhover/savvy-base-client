<script setup lang="ts">
import { ElMessage, ElTree } from 'element-plus'
import type { Permission } from '@/modules/permission/api/type.ts'
import { computed, ref } from 'vue'
import { permissionApi } from '@/modules/permission/api'
import { roleApi } from '@/modules/role/api'
import { useFormData } from '@/hooks/useFormData'
import type { RoleForm } from '@/modules/role/api/type.ts'

const visible = ref(false)

const emit = defineEmits<{
  (type: 'update'): void
}>()

const treeRef = ref<InstanceType<typeof ElTree>>()

async function getInfo(id: string) {
  const data = await roleApi.info(id)
  resetData(data)
  treeRef.value?.setCheckedKeys(
    data.permissions.map((item) => item.id),
    true
  )
}

const permissions = ref<Permission[]>([])
const loadedPermissions = false

async function getPermissions() {
  permissions.value = await permissionApi.tree()
}

const { formData, resetData, validForm } = useFormData<RoleForm>({
  id: '',
  name: '',
  permission_ids: []
})

const title = computed(() => {
  return formData.value.id ? '编辑角色' : '新增角色'
})

const saveLoading = ref(false)
async function saveRole() {
  await validForm()
  const saveHandle = formData.value.id ? roleApi.update : roleApi.create
  await saveHandle({
    ...formData.value,
    permission_ids: (treeRef.value?.getCheckedKeys() ?? []) as string[]
  }).withLoading(saveLoading)

  ElMessage.success('保存成功')
  visible.value = false
  emit('update')
}

defineExpose({
  open(id?: string) {
    resetData()
    treeRef.value?.setCheckedKeys([])
    if (!loadedPermissions) {
      getPermissions()
    }
    if (id) {
      getInfo(id)
    }
    visible.value = true
  }
})

const rules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
}
</script>

<template>
  <el-dialog v-model="visible" :title="title" width="500px" :close-on-click-modal="false">
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="拥有权限">
        <el-tree
          default-expand-all
          :expand-on-click-node="false"
          ref="treeRef"
          style="width: 100%"
          :data="permissions"
          node-key="id"
          :props="{
            label: 'name'
          }"
          check-on-click-node
          show-checkbox
          check-strictly
        ></el-tree>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :loading="saveLoading" type="primary" @click="saveRole">确定</el-button>
      <el-button @click="visible = false">取消</el-button>
    </template>
  </el-dialog>
</template>
