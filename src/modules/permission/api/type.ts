// 权限
export type Permission = {
  id: string
  name: string
  pid: string
  code: string
  children: Permission[]
}

export type PermissionForm = {
  id: string
  name: string
  pid: string
  code: string
}
