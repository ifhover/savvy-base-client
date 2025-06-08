import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore.ts'
import { ApiStatus, type FileResult } from '@/utils/request/type.ts'
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { addLoadingTask, subLoadingTask } from '@/utils/request/commonLoading.ts'
import { useRouter } from 'vue-router'
import { getFileNameFromContentDisposition } from '@/utils/file.ts'
import router from '@/router'

export const REQUEST_CONFIG = {
  PICK_DATA: 'PICK_DATA',
  HANDLE_ERROR: 'HANDLE_ERROR'
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

axiosInstance.interceptors.request.use(
  (config) => {
    addLoadingTask()
    if (config.url?.includes('://') ? config.url?.startsWith(import.meta.env.VITE_BASE_URL) : true) {
      const userStore = useUserStore()
      if (userStore.token) {
        config.headers.set('Authorization', `Bearer ${userStore.token}`)
      }

      config.headers.set(REQUEST_CONFIG.PICK_DATA, config.headers.get(REQUEST_CONFIG.PICK_DATA) ?? '1')
      config.headers.set(REQUEST_CONFIG.HANDLE_ERROR, config.headers.get(REQUEST_CONFIG.HANDLE_ERROR) ?? '1')
    }

    return config
  },
  (error) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    subLoadingTask()
    if (response.status === 200) {
      if (response.config.headers.get(REQUEST_CONFIG.HANDLE_ERROR) === '1') {
        if (
          Object.prototype.toString.call(response.data) === '[object Object]' &&
          response.data.status !== ApiStatus.SUCCESS
        ) {
          if (response.data.status === ApiStatus.UNAUTHORIZED) {
            const userStore = useUserStore()
            userStore.logout()
            router?.push({ name: 'login' })
          }
          ElMessage.error(response.data.message || '服务器发生错误')
          return Promise.reject(response)
        }
      }
      if (response.config.headers.get(REQUEST_CONFIG.PICK_DATA) === '1') {
        return response.data.data
      }
      return response
    } else {
      ElMessage.error(response.statusText)
      return Promise.reject(response)
    }
  },
  (error) => {
    subLoadingTask()
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

/* 导出封装的请求方法 */
export const request = {
  get<T = any>(url: string, params?: AxiosRequestConfig['params'], config?: AxiosRequestConfig): Promise<T> {
    let axiosConfig: AxiosRequestConfig = Object.assign({}, config ?? {})
    if (params) axiosConfig.params = params
    return axiosInstance.get(url, axiosConfig)
  },
  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.post(url, data, config)
  },
  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.put(url, data, config)
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.delete(url, config)
  },
  async getFile(url: string, params?: AxiosRequestConfig['params']): Promise<FileResult> {
    const response = await axiosInstance.get<Blob>(url, {
      params,
      responseType: 'blob',
      headers: {
        [REQUEST_CONFIG.PICK_DATA]: '0'
      }
    })
    const disposition = response.headers['content-disposition']
    let filename = getFileNameFromContentDisposition(disposition)

    return { file_path: window.URL.createObjectURL(response.data), file_name: filename ?? '' }
  },
  async postFile(url: string, data?: object) {
    const response = await axiosInstance.post<Blob>(url, data, {
      responseType: 'blob',
      headers: {
        [REQUEST_CONFIG.PICK_DATA]: '0'
      }
    })
    const disposition = response.headers['content-disposition']
    let filename = getFileNameFromContentDisposition(disposition)

    return { file_path: window.URL.createObjectURL(response.data), file_name: filename ?? '' }
  }
}
