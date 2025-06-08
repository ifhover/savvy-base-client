import type { PageQuery } from '@/utils/request/type.ts'
import type { Reactive } from 'vue'

export type Page = {
  page_size: number
  page_index: number
  total: number
}

export type UsePageOption = {
  page_size?: number
  provide_name?: string
  autoRun?: boolean
}

export type PageInstance = {
  page: Reactive<Page>
  provide_name: string
  change: (page: Partial<PageQuery>) => void
  set: (page: Partial<Page>) => void
  search: () => void
  reload: () => void
}
