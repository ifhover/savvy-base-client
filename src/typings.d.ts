import 'vue-router'

declare global {
  interface Promise<T> {
    withLoading(loading: Ref<boolean>): Promise<T>
  }
}


declare module 'vue-router' {
  interface RouteMeta {
    requirePermission?: string
    guards?: string[]
  }
}

export {}