import type { UsePageOption } from '@/hooks/usePage/type.ts'
import type { OmitPageQuery, PageQuery } from '@/utils/request/type.ts'

export type UsePageRequestOption<P extends PageQuery> = UsePageOption & {
  params?: OmitPageQuery<P>
}
