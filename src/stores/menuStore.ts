import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Menu } from '@/modules/menu/api/type.ts'
import { userApi } from '@/modules/user/api'
import { useRoute } from 'vue-router'

export const useMenuStore = defineStore('menu', () => {
  const route = useRoute()
  const menus = ref<Menu[]>([])
  async function getMenu() {
    menus.value = await userApi.myMenu()
  }

  const current = ref<Menu | null>(null)

  const bread = ref<Menu[]>([])

  watch(
    route,
    () => {
      const findBreadMenus = (menus: Menu[], path: string): Menu[] => {
        for (const menu of menus) {
          if (menu.path === path) {
            return [menu]
          }
          if (menu.children?.length) {
            const found = findBreadMenus(menu.children, path)
            if (found.length) {
              return [menu, ...found]
            }
          }
        }
        return []
      }

      bread.value = findBreadMenus(menus.value, route.path)
      current.value = bread.value.at(-1) ?? null
    },
    {
      immediate: true
    }
  )

  return {
    getMenu,
    menus,
    current,
    bread
  }
})
