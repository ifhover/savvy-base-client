<script setup lang="ts">
import { ElMessage, type FormRules } from 'element-plus'
import { computed, ref } from 'vue'
import { useFormData } from '@/hooks/useFormData'
import type { DictForm } from '@/modules/dict/api/type.ts'
import { dictApi } from '@/modules/dict/api/item'

const visible = ref(false)

const emit = defineEmits<{
  (type: 'update'): void
}>()

const { formData, resetData, mergeData, validForm } = useFormData<DictForm>({
  id: '',
  name: '',
  value: '',
  remark: '',
  group_code: '',
  sort: 0
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
  value: [{ required: true, message: '请输入字典值', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入优先级', trigger: 'blur' }]
}

async function getInfo() {
  if (formData.value.id) {
    const data = await dictApi.info(formData.value.id)
    mergeData(data)
  }
}

const title = computed(() => {
  return formData.value.id ? '编辑字典' : '新增字典'
})

async function saveRole() {
  await validForm()
  const saveHandle = formData.value.id ? dictApi.update : dictApi.create
  await saveHandle(formData.value)

  ElMessage.success('保存成功')
  visible.value = false
  emit('update')
}

defineExpose({
  open(fill: Partial<DictForm>) {
    resetData(fill)
    if (fill.id) {
      getInfo()
    }
    visible.value = true
  }
})
</script>

<template>
  <el-dialog v-model="visible" :title="title" width="500px" :close-on-click-modal="false">
    <el-form :rules="rules" ref="formRef" :model="formData" label-width="80px">
      <el-form-item label="字典名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="字典值" prop="value">
        <el-input v-model="formData.value"></el-input>
      </el-form-item>
      <el-form-item label="优先级" prop="sort">
        <el-input-number v-model="formData.sort"></el-input-number>
      </el-form-item>
      <el-form-item label="字典备注" prop="remark">
        <el-input type="textarea" v-model="formData.remark"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="saveRole">确定</el-button>
      <el-button @click="visible = false">取消</el-button>
    </template>
  </el-dialog>
</template>
