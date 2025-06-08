import type { PageQuery } from '@/utils/request/type.ts'
import type { Role } from '@/modules/role/api/type.ts'

// 用户
export type User = {
  id: string
  name: string
  password: string
  roles: Role[]
}

export interface UserLoginRequest {
  name: string
  password: string
  captcha_id: string
  captcha_value: string
}

export interface UserListRequest extends PageQuery {
  keywords?: string
}

export interface UserForm {
  id: string
  name: string
  password: string
  confirm_password: string
  role_ids: string[]
}

export type UserMy = {
  id: string
  name: string
  roles: Role[]
  permission_codes: string[]
}

export type UserUpdateMyRequest = {
  name: string
  password: string
  confirm_password: string
}
