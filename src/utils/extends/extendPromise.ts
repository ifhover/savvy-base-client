import type { Ref } from 'vue'

Promise.prototype.withLoading = function (loading: Ref<boolean>) {
  loading.value = true
  this.finally(() => {
    loading.value = false
  })
  return this
}
