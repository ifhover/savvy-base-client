import { request } from '@/utils/request'
import type { Menu, MenuForm } from '@/modules/menu/api/type.ts'

export const menuApi = {
  tree: () => {
    return request.get<Menu[]>('menu/tree')
  },
  info(id: string) {
    return request.get<Menu>(`/menu/info/${id}`)
  },
  create(form: Omit<MenuForm, 'id'>) {
    return request.post<Menu>('/menu/create', form)
  },
  update(form: MenuForm) {
    return request.post('/menu/update', form)
  },
  delete(id: string) {
    return request.post(`/menu/delete/${id}`)
  }
}
