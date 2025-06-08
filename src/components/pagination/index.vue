<script setup lang="ts">
import { computed, inject, reactive, watch } from 'vue'
import type { PageInstance } from '@/hooks/usePage/type.ts'

defineOptions({
  name: 'pagination'
})

const props = withDefaults(
  defineProps<{
    name?: string
    instance?: PageInstance
  }>(),
  {
    name: 'pagination'
  }
)

const instance: PageInstance = props.instance ?? inject(props.name)!

if (!instance) {
  throw new Error('Pagination Error：找不到instance')
}
const page = reactive({
  page_index: instance.page.page_index,
  page_size: instance.page.page_size
})

const pageSizes = computed(() => {
  return Array.from(new Set([10, 20, 30, 40, 50, 100, instance.page.page_size])).sort((a, b) => {
    return a - b
  })
})

watch(
  page,
  () => {
    instance.change({
      page_index: page.page_index,
      page_size: page.page_size
    })
  },
  { deep: true }
)
function change() {}
</script>

<template>
  <template v-if="instance">
    <el-pagination
      background
      v-model:current-page="page.page_index"
      v-model:page-size="page.page_size"
      :total="instance?.page.total"
      :page-sizes="pageSizes"
      @change="change"
      layout="total, ->,prev, pager, next, sizes"
    />
  </template>
</template>

<style lang="less" scoped></style>
