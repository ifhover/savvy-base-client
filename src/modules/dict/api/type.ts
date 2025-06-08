import type { PageQuery } from '@/utils/request/type.ts'

export type DictGroup = {
  id: string
  code: string
  remark: string
}

export type DictGroupListRequest = PageQuery & {
  keywords: string
}

export type DictGroupForm = DictGroup

// ----------------------------

export type Dict = {
  id: string
  name: string
  value: string
  group_code: string
  remark: string
  sort: number
}

export type DictListRequest = {
  group_code: string
}

export type DictForm = Dict
