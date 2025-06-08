import { request } from '@/utils/request'
import type { User, UserForm, UserListRequest, UserLoginRequest, UserMy, UserUpdateMyRequest } from './type'
import type { PageData } from '@/utils/request/type.ts'
import type { Menu } from '@/modules/menu/api/type.ts'

export const userApi = {
  login(form: UserLoginRequest) {
    return request.post<string>('/user/login', form)
  },
  list(query?: UserListRequest) {
    return request.get<PageData<User>>('/user/list', query)
  },
  info(id: string) {
    return request.get<User>(`/user/info/${id}`)
  },
  create(form: Omit<UserForm, 'id'>) {
    return request.post<User>('/user/create', form)
  },
  update(form: UserForm) {
    return request.post('/user/update/', form)
  },
  delete(id: string) {
    return request.post(`/user/delete/${id}`)
  },
  myProfile() {
    return request.get<UserMy>('/user/my_profile')
  },
  myMenu() {
    return request.get<Menu[]>('/user/my_menu')
  },
  updateMy(req: UserUpdateMyRequest) {
    return request.post('user/update_my', req)
  },
}
