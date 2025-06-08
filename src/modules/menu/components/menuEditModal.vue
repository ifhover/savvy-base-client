<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { Menu, MenuForm } from '@/modules/menu/api/type.ts'
import { computed, ref } from 'vue'
import { menuApi } from '@/modules/menu/api'
import { useFormData } from '@/hooks/useFormData'
import type { Permission } from '@/modules/permission/api/type.ts'
import { permissionApi } from '@/modules/permission/api'
import Icon from '@/components/icon/index.vue'
import Flex from '@/components/flex/index.vue'

const visible = ref(false)

const emit = defineEmits<{
  (type: 'update'): void
}>()

async function getInfo(id: string) {
  const data = await menuApi.info(id)
  resetData(data)
}

const menus = ref<Menu[]>([])
async function getMenus() {
  menus.value = await menuApi.tree()
}

const permissions = ref<Permission[]>([])
async function getPermissions() {
  permissions.value = await permissionApi.tree()
}

const { formData, resetData, validForm } = useFormData<MenuForm>({
  id: '',
  name: '',
  icon: '',
  is_displayed: true,
  path: '',
  pid: '',
  required_permission_id: ''
})

const title = computed(() => {
  return formData.value.id ? '编辑菜单' : '新增菜单'
})

async function save() {
  await validForm()
  const saveHandle = formData.value.id ? menuApi.update : menuApi.create
  await saveHandle(formData.value)

  ElMessage.success('保存成功')
  visible.value = false
  emit('update')
}

defineExpose({
  open(id?: string) {
    resetData()
    getMenus()
    getPermissions()
    if (id) {
      getInfo(id)
    }
    visible.value = true
  }
})

const rules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
}
</script>

<template>
  <el-dialog v-model="visible" :title="title" width="500px" :close-on-click-modal="false">
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="70px">
      <el-form-item label="所属菜单" prop="pid">
        <el-tree-select
          clearable
          check-strictly
          :check-on-click-node="true"
          value-on-clear=""
          default-expand-all
          v-model="formData.pid"
          :data="menus"
          node-key="id"
          :props="{
            label: 'name'
          }"
          placeholder="不选择默认最外层"
        ></el-tree-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="formData.icon">
          <template #suffix>
            <icon :type="formData.icon"></icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="页面路径" prop="path">
        <el-input v-model="formData.path"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="is_displayed">
        <el-switch v-model="formData.is_displayed"></el-switch>
      </el-form-item>
      <el-form-item label="依赖权限" prop="required_permission_id">
        <el-tree-select
          clearable
          check-strictly
          :check-on-click-node="true"
          value-on-clear=""
          default-expand-all
          v-model="formData.required_permission_id"
          :data="permissions"
          node-key="id"
          :props="{
            label: 'name'
          }"
          placeholder="可选, 当拥有指定权限时才展示菜单"
        ></el-tree-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">确定</el-button>
      <el-button @click="visible = false">取消</el-button>
    </template>
  </el-dialog>
</template>
