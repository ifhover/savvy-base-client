export enum ApiStatus {
  BUSINESS_ERROR = -1,
  SUCCESS = 0,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500
}

export type ApiResponse<T> = {
  data: T
  status: ApiStatus
  message: string
}

export interface PageQuery {
  page_size: number
  page_index: number
}

export interface PageData<T> {
  list: T[]
  page_size: number
  total: number
  page_index: number
}

export type OmitPageQuery<T extends PageQuery> = Omit<T, keyof PageQuery>

export type FileResult = {
  file_name: string
  file_path: string
}
