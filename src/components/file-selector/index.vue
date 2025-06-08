<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'file-selector'
})

const props = withDefaults(
  defineProps<{
    accept?: string
    maxSize?: number
    multiple?: boolean
  }>(),
  {
    multiple: false
  }
)

const emit = defineEmits<{
  (e: 'change', file: File[]): void
}>()

const inputRef = useTemplateRef<HTMLInputElement>('inputRef')

function change(e: Event) {
  const target = e.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    for (let file of Array.from(files)) {
      if (props.maxSize && file.size <= props.maxSize) {
        let size: string
        if (props.maxSize < 1024 * 1024) {
          size = (props.maxSize / 1024).toFixed(2) + 'KB'
        } else {
          size = (props.maxSize / (1024 * 1024)).toFixed(2) + 'MB'
        }
        ElMessage.error(`文件大小不能超过${size}`)
        return
      }
    }
    emit('change', Array.from(files))
    target.value = ''
  }
}

defineExpose({
  select() {
    inputRef.value?.click()
  }
})
</script>

<template>
  <input
    type="file"
    ref="inputRef"
    :multiple="props.multiple"
    :accept="props.accept"
    style="position: absolute; margin-left: -100%; top: -100%; visibility: hidden; zoom: 0.01"
    @change="change"
  />
</template>
