import { request } from '@/utils/request'
import type { Captcha } from './type.ts'

export const captchaApi = {
  getCaptcha: () => {
    return request.get<Captcha>(`captcha/get`)
  }
}
