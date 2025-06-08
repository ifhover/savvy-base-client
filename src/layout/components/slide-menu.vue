<script setup lang="ts">
import SlideMenuItem from './slide-menu-item.vue'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useMenuStore } from '@/stores/menuStore.ts'
import type { Menu } from '@/modules/menu/api/type.ts'

const router = useRouter()

const menuStore = useMenuStore()

function handleOpen(key: string, keyPath: string[]) {}
function handleClose(key: string, keyPath: string[]) {}

const singleOpen = ref(false)
const active = ref<string>(menuStore.current?.id || '')
const openKeys = ref<string[]>(menuStore.bread.map((item) => item.id))

function handleSelect(key: string) {
  active.value = key
  const findMenu = (menus: Menu[]): Menu | null => {
    for (const menu of menus) {
      if (menu.id === key) {
        return menu
      }
      if (menu.children) {
        const found = findMenu(menu.children)
        if (found) return found
      }
    }
    return null
  }

  const targetMenu = findMenu(menuStore.menus)
  if (targetMenu?.path) {
    router.push(targetMenu.path)
  }
}

watch(
  () => menuStore.current,
  () => {
    active.value = menuStore.current?.id || ''
  }
)
</script>

<template>
  <div class="slide-menu">
    <el-menu
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :default-active="active"
      :default-openeds="openKeys"
      :unique-opened="singleOpen"
    >
      <slide-menu-item v-for="(menu, key) in menuStore.menus" :menu="menu" :key="key"></slide-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
.slide-menu {
  --hover-color: tint(#000, 95%);
  --text-color: tint(#000, 35%);
  --active-color: var(--el-color-primary-light-9);
  --active-text: var(--el-color-primary);
  :deep(.el-menu) {
    border-right: none;
    background-color: initial;
    .el-menu-item-group,
    .el-sub-menu {
      &:not(:last-child) {
        margin-bottom: 6px;
      }
    }
    .el-menu-item,
    .el-sub-menu .el-sub-menu__title {
      margin-left: 10px;
      margin-right: 10px;
      height: 38px;
      line-height: 38px;
      border-radius: var(--el-border-radius-base);
      font-size: 14px;
      transition: 0.2s;
      display: flex;
      align-items: center;
      color: var(--text-color);
      --el-menu-level-padding: 15px;
      --el-menu-base-level-padding: 15px;
      user-select: none;
      font-weight: 500;
      &:not(:last-child):not(.el-sub-menu__title) {
        margin-bottom: 6px;
      }
      &:hover {
        background-color: var(--hover-color);
      }
      &.is-active {
        background-color: var(--active-color);
        --text-color: var(--active-text);
        .point {
          background-color: var(--text-color);
        }
      }
      > .icon,
      > span .icon,
      > .point {
        margin-right: 10px;
      }
      .point {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        border: 2px solid var(--text-color);
        margin-right: 10px;
      }
    }
    .el-sub-menu {
      > .el-menu {
        &::before {
          content: ' ';
          display: block;
          height: 6px;
        }
      }
      .el-sub-menu__title {
        > span {
          display: flex;
          align-items: center;
        }
        .el-sub-menu__icon-arrow {
          color: var(--slate-600);
          right: 15px;
          font-size: 16px;
          margin-top: -8px;
        }
      }
    }
  }
}
</style>
