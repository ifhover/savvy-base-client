import { type RouteRecordRaw, RouterView } from 'vue-router'
import { adminRoutes } from '@/router/routes/admin.ts'
import router from '@/router'
import { useUserStore } from '@/stores/userStore.ts'

export function registerRoutes() {
  const userStore = useUserStore()
  const recursion = (list: RouteRecordRaw[]): RouteRecordRaw[] => {
    return list.filter((item) => {
      if (!item.meta?.permission || userStore.myProfile?.permission_codes.includes(item.meta.requirePermission!)) {
        return {
          ...item,
          children: item.children ? recursion(item.children) : []
        }
      }
    })
  }
  const filteredRoutes = recursion(adminRoutes)
  router.addRoute('home', {
    name: 'admin-routes',
    path: '/',
    component: RouterView,
    children: filteredRoutes
  })
}

export function removeRoutes() {
  router.removeRoute('admin-routes')
}
