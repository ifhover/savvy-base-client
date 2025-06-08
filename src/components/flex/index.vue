<script setup lang="ts">
withDefaults(
  defineProps<{
    gap?: string | number
    vertical?: boolean
    justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around'
    align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  }>(),
  {
    gap: '8px',
    vertical: false,
    justify: 'start',
    align: 'stretch'
  }
)

defineOptions({
  name: 'flex'
})
</script>

<template>
  <div
    class="flex"
    :style="`flex-direction: ${vertical ? 'column' : 'row'}; justify-content: ${justify}; align-items: ${align};gap: ${gap}`"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.flex {
  display: flex;
}
</style>
