import { useUserStore } from '@/stores/userStore.ts'

export function hasPermission(permission_code: string): boolean {
  const userStore = useUserStore()
  return Boolean(userStore.myProfile?.permission_codes.includes(permission_code))
}
