<script setup lang="ts">
import { onMounted } from 'vue'
import { syncColor } from '@/utils/element-color.ts'

onMounted(() => {
  syncColor()
})
</script>

<template>
  <RouterView />
</template>
