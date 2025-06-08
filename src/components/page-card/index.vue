<script setup lang="ts">
defineProps<{
  title?: string
}>()

defineOptions({
  name: 'page-card'
})
</script>

<template>
  <div class="card">
    <div class="header">
      <div class="title" v-if="title">{{ title }}</div>
      <div class="filter" v-if="$slots.filter">
        <slot name="filter"></slot>
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border-radius: calc(var(--border-radius) + 2px);
  background-color: white;
  box-shadow: var(--shadow-xs);
  padding: 20px;
  .header {
    .title {
      padding-bottom: 20px;
      font-size: 16px;
      font-weight: 500;
      color: var(--gray-800);
    }
    .filter {
      padding-bottom: 16px;
      border-bottom: 1px solid var(--gray-100);
      margin-bottom: 16px;
      .el-form {
        display: grid;
      }
    }
  }
  .content {
    :deep(> .action) {
      margin-bottom: 10px;
    }
    :deep(> .el-pagination) {
      padding-top: 20px;
    }
  }
}
</style>
