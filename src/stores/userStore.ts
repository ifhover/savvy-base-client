import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { UserMy } from '@/modules/user/api/type'
import { userApi } from '@/modules/user/api'
import { removeRoutes } from '@/utils/router.ts'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const jwtRaw = computed<{ exp: number } | undefined>(() => {
      if (token.value) {
        let jwt: { exp: number } = JSON.parse(
          window.atob(token.value.replace('_', '/').replace('-', '+').split('.')[1])
        )
        return jwt
      }
    })
    const isExpire = computed<boolean>(() => {
      if (jwtRaw.value?.exp) {
        return jwtRaw.value.exp * 1000 < Date.now()
      }
      return true
    })

    const myProfile = ref<UserMy | null>()

    async function getMyProfile() {
      myProfile.value = await userApi.myProfile()
    }

    function logout() {
      token.value = ''
      myProfile.value = null
      removeRoutes()
    }

    return {
      myProfile,
      token,
      isExpire,
      logout,
      getMyProfile
    }
  },
  {
    persist: {
      pick: ['token']
    }
  }
)
