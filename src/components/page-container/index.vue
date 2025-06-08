<script setup lang="ts">
import { useMenuStore } from '@/stores/menuStore.ts'
import Icon from '@/components/icon/index.vue'

const props = withDefaults(
  defineProps<{
    breadcrumb?: boolean
    title?: string
  }>(),
  {
    breadcrumb: true
  }
)

const menuStore = useMenuStore()

defineOptions({
  name: 'PageContainer'
})
</script>

<template>
  <div class="page-container">
    <el-breadcrumb v-if="breadcrumb">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(value, key) in menuStore.bread" :key="value.id">
        <icon :type="value.icon"></icon>
        {{ value.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="head">
      <div class="title">
        {{ title ?? menuStore.current?.name }}
      </div>
      <div class="extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.page-container {
  .head {
    padding-top: 8px;
    padding-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      height: 32px;
      line-height: 32px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      font-size: 20px;
    }
  }
}
</style>
