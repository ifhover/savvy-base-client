import { request } from '@/utils/request'
import type { Dict, DictForm, DictListRequest } from './type'

export const dictApi = {
  list(req: DictListRequest) {
    return request.get<Dict[]>('/dict/list', req)
  },
  info(id: string) {
    return request.get<Dict>(`/dict/info/${id}`)
  },
  create(form: Omit<DictForm, 'id'>) {
    return request.post<Dict>('/dict/create', form)
  },
  update(form: DictForm) {
    return request.post('/dict/update', form)
  },
  delete(id: string) {
    return request.post(`/dict/delete/${id}`)
  }
}
