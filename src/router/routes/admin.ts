import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: 'user',
    component: () => import('@/modules/user/views/list.vue'),
    meta: {
      requirePermission: 'user'
    }
  },
  {
    path: 'user/my',
    component: () => import('@/modules/user/views/my.vue')
  },
  {
    path: 'role',
    component: () => import('@/modules/role/views/list.vue'),
    meta: {
      requirePermission: 'role'
    }
  },
  {
    path: 'dict/group',
    component: () => import('@/modules/dict/views/groupList.vue'),
    meta: {
      requirePermission: 'dict'
    }
  },
  {
    path: 'permission',
    component: () => import('@/modules/permission/views/list.vue'),
    meta: {
      requirePermission: 'permission'
    }
  },
  {
    path: 'generate_code',
    component: () => import('@/modules/generateCode/views/index.vue'),
    meta: {
      requirePermission: 'generate_code'
    }
  },
  {
    path: 'menu',
    component: () => import('@/modules/menu/views/list.vue'),
    meta: {
      requirePermission: 'menu'
    }
  }
]
