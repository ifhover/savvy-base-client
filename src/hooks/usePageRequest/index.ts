import type { OmitPageQuery, PageData, PageQuery } from '@/utils/request/type.ts'
import type { UsePageRequestOption } from '@/hooks/usePageRequest/type.ts'
import { usePage } from '@/hooks/usePage'
import { ref } from 'vue'

export function usePageRequest<D, T extends PageData<D>, P extends PageQuery>(
  cb: (query: P) => Promise<T>,
  options?: UsePageRequestOption<P>
) {
  const params = ref<OmitPageQuery<P>>((options?.params ?? {}) as any as OmitPageQuery<P>)

  const list = ref<D[]>([])
  const loading = ref(false)

  const page = usePage(
    () => {
      getList()
    },
    { ...options }
  )

  async function getList() {
    const data = await cb({
      page_size: page.page.page_size,
      page_index: page.page.page_index,
      ...params.value
    } as P).withLoading(loading)
    page.set(data)
    list.value = data.list
  }

  return {
    list,
    params,
    loading,
    search: page.search,
    change: page.change,
    reload: page.reload
  }
}
