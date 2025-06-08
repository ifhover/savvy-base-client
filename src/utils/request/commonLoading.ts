import { ElLoading } from 'element-plus'

let count = 0
let loadingService: ReturnType<typeof ElLoading.service> | null = null
export const addLoadingTask = () => {
  count++
  if (loadingService === null) {
    loadingService = ElLoading.service({
      fullscreen: true
    })
  }
}

export const subLoadingTask = () => {
  count--
  if (count <= 0) {
    loadingService?.close()
    loadingService = null
  }
}
