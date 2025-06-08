import { onMounted, provide, reactive } from 'vue'
import type { PageQuery } from '@/utils/request/type.ts'
import type { Page, PageInstance, UsePageOption } from '@/hooks/usePage/type.ts'

export function usePage(callback: (page: PageQuery) => any, option?: UsePageOption) {
  let mergedOption: Required<UsePageOption> = {
    page_size: 15,
    provide_name: 'pagination',
    autoRun: true,
    ...(option ?? {})
  }

  const page = reactive({
    page_size: mergedOption.page_size,
    page_index: 1,
    total: 0
  })

  const change = (params: Partial<PageQuery>) => {
    page.page_index = params.page_index ?? page.page_index
    page.page_size = params.page_size ?? page.page_size
    callback(page)
  }

  const set = (data: Partial<Page>) => {
    page.page_index = data.page_index ?? page.page_index
    page.page_size = data.page_size ?? page.page_size
    page.total = data.total ?? page.total
  }

  const instance: PageInstance = {
    page,
    provide_name: mergedOption.provide_name,
    change,
    set,
    search() {
      change({
        page_index: 1
      })
    },
    reload() {
      callback(page)
    }
  }

  provide(mergedOption.provide_name, instance)

  onMounted(() => {
    if (mergedOption.autoRun) {
      callback(page)
    }
  })

  return instance
}
