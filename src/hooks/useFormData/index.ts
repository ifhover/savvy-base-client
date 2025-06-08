import { ref, useTemplateRef } from 'vue'
import type { UseFormDataOption } from '@/hooks/useFormData/type.ts'
import type { FormInstance } from 'element-plus'

export function useFormData<T extends object>(init: T, option?: UseFormDataOption) {
  const mergedOption: Required<UseFormDataOption> = {
    ref: 'formRef',
    ...(option ?? {})
  }
  const formData = ref<T>(init)

  const formRef = useTemplateRef<FormInstance>(mergedOption.ref)

  const resetData = (mergeData?: Partial<T>) => {
    formRef.value?.resetFields()
    formData.value = { ...init, ...(mergeData ?? {}) }
  }

  const mergeData = (data: Partial<T>) => {
    formData.value = { ...formData.value, ...data }
  }

  const validForm = async () => {
    return formRef.value?.validate()
  }

  return { formData, resetData, mergeData, formRef, validForm }
}
