<script lang="ts" setup>
import * as map from '@icon-park/vue-next/es/map'
import { h, ref, useAttrs, type VNode, watch } from 'vue'
import { pascalCase } from 'change-case'

defineOptions({
  name: 'icon',
  inheritAttrs: false
})

const attrs = useAttrs()

const props = defineProps<{
  type: string
}>()

const c = ref<VNode | null>()

watch(
  () => props.type,
  () => {
    const type = pascalCase(props.type)
    if (type in map) {
      c.value = h(map[type as keyof typeof map], { ...attrs })
    } else {
      c.value = null
    }
  },
  {
    immediate: true
  }
)
</script>

<template>
  <component v-if="c" :is="c"></component>
  <slot v-else></slot>
</template>
