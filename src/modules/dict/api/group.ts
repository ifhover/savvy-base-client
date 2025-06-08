import type { DictGroup, DictGroupForm, DictGroupListRequest } from './type'
import { request } from '@/utils/request'
import type { PageData } from '@/utils/request/type.ts'

export const dictGroupApi = {
  list(req: DictGroupListRequest) {
    return request.get<PageData<DictGroup[]>>('/dict_group/list', req)
  },
  info(id: string) {
    return request.get<DictGroup>(`/dict_group/info/${id}`)
  },
  create(form: Omit<DictGroupForm, 'id'>) {
    return request.post<DictGroup>('/dict_group/create', form)
  },
  update(form: DictGroupForm) {
    return request.post('/dict_group/update', form)
  },
  delete(id: string) {
    return request.post(`/dict_group/delete/${id}`)
  }
}
