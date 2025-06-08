<script setup lang="ts">
import Icon from '@/components/icon/index.vue'
import type { Menu } from '@/modules/menu/api/type.ts'

defineOptions({
  name: 'SlideMenuItem'
})

defineProps<{
  menu: Menu
}>()
</script>

<template>
  <template v-if="menu.children">
    <!--    <el-menu-item-group v-if="menu.group" :title="menu.title">-->
    <!--      <slide-menu-item v-for="item in menu.children" :menu="item" :key="item.index" />-->
    <!--    </el-menu-item-group>-->
    <el-sub-menu :index="menu.id">
      <template #title>
        <icon class="icon" :type="menu.icon"></icon>
        <span>{{ menu.name }}</span>
      </template>
      <slide-menu-item v-for="item in menu.children" :menu="item" :key="item.id" />
    </el-sub-menu>
  </template>
  <el-menu-item :index="menu.id" v-else>
    <icon class="icon" :type="menu.icon">
      <div class="point"></div>
    </icon>
    {{ menu.name }}
  </el-menu-item>
</template>
