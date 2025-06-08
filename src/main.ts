import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './router/guards'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/element-plus/index.less'
import '@/assets/style/main.css'
import zhCN from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { appContext } from '@/utils/appContext.ts'
import '@/utils/extends'
import { install } from '@icon-park/vue-next/es/all'
import '@icon-park/vue-next/styles/index.css'

dayjs.locale('zh-cn')

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCN
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

install(app)

appContext.value = app._context

app.mount('#app')
