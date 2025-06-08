import { request } from '@/utils/request'
import type { Role, RoleForm, RoleListRequest } from './type.ts'

export const roleApi = {
  list: (query?: RoleListRequest) => {
    return request.get<Role[]>('role/list', query)
  },
  all: (query?: RoleListRequest) => {
    return request.get<Role[]>('role/list_all', query)
  },
  info(id: string) {
    return request.get<Role>(`/role/info/${id}`)
  },
  create(form: Omit<RoleForm, 'id'>) {
    return request.post<Role>('/role/create', form)
  },
  update(form: RoleForm) {
    return request.post('/role/update', form)
  },
  delete(id: string) {
    return request.post(`/role/delete/${id}`)
  }
}
