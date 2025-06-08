<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { computed, ref } from 'vue'
import { useFormData } from '@/hooks/useFormData'
import type { UserForm } from '@/modules/user/api/type.ts'
import { roleApi } from '@/modules/role/api'
import { userApi } from '@/modules/user/api'
import type { Role } from '@/modules/role/api/type.ts'

interface Emits {
  (e: 'success'): void
}

const emit = defineEmits<Emits>()

// 弹窗显示状态
const visible = ref(false)

// 表单数据
const formRef = ref<FormInstance>()
const { formData, resetData, mergeData } = useFormData<UserForm>({
  id: '',
  name: '',
  password: '',
  confirm_password: '',
  role_ids: []
})

// 弹窗标题
const dialogTitle = computed(() => (formData.value.id ? '编辑用户' : '新增用户'))

const getLoading = ref(false)
async function getUser(id: string) {
  let data = await userApi.info(id)
  mergeData({ ...data, role_ids: data.roles.map((role) => role.id) })
}

const roles = ref<Role[]>()
let loadRoles = false

async function getRoles() {
  roles.value = await roleApi.all()
}

// 表单校验规则
const rules = computed<FormRules<UserForm>>(() => ({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    {
      required: !formData.value.id,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  confirm_password: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      trigger: 'change',
      validator: (rule: any, value: any, callback: any) => {
        if (value !== formData.value.password) {
          callback(new Error('两次密码不一致'))
        }
        callback()
      }
    }
  ],
  roles: [{ required: true, message: '请选择角色', trigger: 'blur' }]
}))

// 打开弹窗
const open = async (id?: string) => {
  if (!loadRoles) {
    getRoles()
  }
  loadRoles = true
  visible.value = true
  resetData()
  formRef.value?.resetFields()
  if (id) {
    getUser(id)
  }
}

const saveLoading = ref(false)
async function saveUser() {
  await formRef.value?.validate()
  if (formData.value.id) {
    await userApi.update(formData.value).withLoading(saveLoading)
  } else {
    await userApi.create(formData.value).withLoading(saveLoading)
  }
  ElMessage.success('保存成功')
  emit('success')
  visible.value = false
}

// 暴露方法供父组件调用
defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="visible" :title="dialogTitle" width="500px" :close-on-click-modal="false">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="80px"
      :validate-on-rule-change="false"
      v-loading="getLoading"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          :placeholder="formData.id ? '不修改请留空' : '请输入密码'"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm_password" v-if="formData.password?.length || !formData.id">
        <el-input v-model="formData.confirm_password" type="password" />
      </el-form-item>
      <el-form-item label="角色" prop="role_ids">
        <el-select v-model="formData.role_ids" multiple placeholder="请选择角色">
          <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="saveUser" :loading="saveLoading">确定</el-button>
      <el-button @click="visible = false" :disabled="saveLoading">取消</el-button>
    </template>
  </el-dialog>
</template>
