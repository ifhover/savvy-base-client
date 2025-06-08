import type { Permission } from '@/modules/permission/api/type.ts'

// 角色
export type Role = {
  id: string
  name: string
  permissions: Permission[]
}

export type RoleListRequest = {
  keywords?: string
}

export type RoleForm = {
  id: string
  name: string
  permission_ids: string[]
}
