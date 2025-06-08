<script setup lang="ts">
import { ElMessage, ElTree, type FormRules } from 'element-plus'
import { computed, ref } from 'vue'
import { useFormData } from '@/hooks/useFormData'
import type { Permission, PermissionForm } from '../api/type'
import { permissionApi } from '../api'

const visible = ref(false)

const emit = defineEmits<{
  (type: 'update'): void
}>()

const { formData, resetData, mergeData, validForm } = useFormData<PermissionForm>({
  id: '',
  name: '',
  pid: '',
  code: ''
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
  pid: [
    {
      trigger: 'blur',
      validator(_, value, callback) {
        if (value && value === formData.value.id) {
          callback('不能选择自己')
        } else {
          callback()
        }
      }
    }
  ]
}

const permissions = ref<Permission[]>([])

async function getPermissions() {
  permissions.value = await permissionApi.tree()
}

async function getInfo() {
  if (formData.value.id) {
    const data = await permissionApi.info(formData.value.id)
    mergeData(data)
  }
}

const title = computed(() => {
  return formData.value.id ? '编辑权限' : '新增权限'
})

const disabledPid = ref(false)

async function saveRole() {
  await validForm()
  const saveHandle = formData.value.id ? permissionApi.update : permissionApi.create
  await saveHandle(formData.value)

  ElMessage.success('保存成功')
  visible.value = false
  emit('update')
}

defineExpose({
  open(fill?: Partial<PermissionForm>) {
    resetData(fill)
    disabledPid.value = !!fill?.pid
    getPermissions()
    if (fill?.id) {
      getInfo()
    }
    visible.value = true
  }
})
</script>

<template>
  <el-dialog v-model="visible" :title="title" width="500px" :close-on-click-modal="false">
    <el-form :rules="rules" ref="formRef" :model="formData" label-width="80px">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限编码" prop="code">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="所属权限" prop="pid">
        <el-tree-select
          clearable
          check-strictly
          :check-on-click-node="true"
          value-on-clear=""
          default-expand-all
          v-model="formData.pid"
          :data="permissions"
          node-key="id"
          :props="{
            label: 'name'
          }"
          placeholder="不选择默认最外层"
        ></el-tree-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="saveRole">确定</el-button>
      <el-button @click="visible = false">取消</el-button>
    </template>
  </el-dialog>
</template>
