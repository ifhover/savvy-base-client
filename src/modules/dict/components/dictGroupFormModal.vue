<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { useFormData } from '@/hooks/useFormData'
import type { DictGroupForm } from '@/modules/dict/api/type.ts'
import { dictGroupApi } from '@/modules/dict/api/group.ts'

const visible = ref(false)

const emit = defineEmits<{
  (type: 'update'): void
}>()

const { formData, resetData, mergeData } = useFormData<DictGroupForm>({
  id: '',
  code: '',
  remark: ''
})

async function getInfo(id: string) {
  const data = await dictGroupApi.info(id)
  mergeData(data)
}

const title = computed(() => {
  return formData.value.id ? '编辑分组' : '新增分组'
})

const saveLoading = ref(false)
async function saveRole() {
  // todo表单校验
  const saveHandle = formData.value.id ? dictGroupApi.update : dictGroupApi.create
  await saveHandle(formData.value).withLoading(saveLoading)

  ElMessage.success('保存成功')
  visible.value = false
  emit('update')
}

defineExpose({
  open(id?: string) {
    resetData()
    if (id) {
      getInfo(id)
    }
    visible.value = true
  }
})
</script>

<template>
  <el-dialog v-model="visible" :title="title" width="500px" :close-on-click-modal="false">
    <el-form>
      <el-form-item label="分组代码">
        <el-input v-model="formData.code"></el-input>
      </el-form-item>
      <el-form-item label="分组备注">
        <el-input type="textarea" v-model="formData.remark"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :loading="saveLoading" type="primary" @click="saveRole">确定</el-button>
      <el-button @click="visible = false">取消</el-button>
    </template>
  </el-dialog>
</template>
