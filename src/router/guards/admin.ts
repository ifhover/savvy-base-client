import { useUserStore } from '@/stores/userStore.ts'
import { useMenuStore } from '@/stores/menuStore.ts'
import router from '@/router'
import { registerRoutes } from '@/utils/router.ts'

router.beforeEach(async (to, from, next) => {
  const hasGuard = to.matched.some((item) => item.meta.guards?.includes('admin'))
  if (!hasGuard) return next()

  const userStore = useUserStore()

  if (userStore.isExpire) {
    userStore.logout()
    return next({ name: 'login' })
  }

  if (!userStore.myProfile) {
    try {
      await userStore.getMyProfile()
    } catch (e) {
      userStore.logout()
      return next({ name: 'login' })
    }
    const menuStore = useMenuStore()
    await menuStore.getMenu()
  }

  if (!router.hasRoute('admin-routes')) {
    registerRoutes()
    return next(to)
  }

  next()
})
