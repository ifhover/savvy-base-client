import 'vue-router'

interface Promise<T> {
  withLoading(loading: Ref<boolean>): Promise<T>
}

declare module 'vue-router' {
  interface RouteMeta {
    requirePermission?: string
    guards?: string[]
  }
}
