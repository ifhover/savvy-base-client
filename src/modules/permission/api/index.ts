import { request } from '@/utils/request'
import type { Permission, PermissionForm } from './type.ts'

export const permissionApi = {
  tree() {
    return request.get<Permission[]>('/permission/tree')
  },
  info(id: string) {
    return request.get<Permission>(`/permission/info/${id}`)
  },
  create(form: Omit<PermissionForm, 'id'>) {
    return request.post<Permission>('/permission/create', form)
  },
  update(form: PermissionForm) {
    return request.post('/permission/update', form)
  },
  delete(id: string) {
    return request.post(`/permission/delete/${id}`)
  }
}
