<script setup lang="ts" generic="T">
import type { ConfirmIcon } from './type'
import { ref } from 'vue'
import Icon from '@/components/icon/index.vue'

const props = withDefaults(
  defineProps<{
    title: string
    content?: string
    icon?: ConfirmIcon
    onOk?: () => Promise<T> | T
    resolve: (res: T | null) => void
    destroy: () => void
  }>(),
  {
    icon: 'warning'
  }
)

const visible = ref(true)
const btnLoading = ref(false)

const onOk = async () => {
  if (props.onOk) {
    const res = props.onOk()
    if (res instanceof Promise) {
      btnLoading.value = true
      const data = await res.catch((error) => {
        btnLoading.value = false
        return Promise.reject(error)
      })
      close(data)
      return
    }
    close(res)
    return
  }
  close(null)
}

function close(res: T | null) {
  props.resolve(res)
  visible.value = false
}
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="title"
    :width="400"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @closed="props.destroy()"
    class="custom-confirm"
  >
    <div class="icon-box" :class="icon">
      <icon v-if="icon === 'info'" class="icon" type="info"></icon>
      <icon v-else-if="icon === 'success'" class="icon" type="check"></icon>
      <icon v-else-if="icon === 'warning'" class="icon" type="caution"></icon>
      <icon v-else-if="icon === 'error'" class="icon" type="caution"></icon>
    </div>
    <div v-if="content" class="content">{{ content }}</div>
    <template #footer>
      <el-button type="primary" :loading="btnLoading" @click="onOk">确定</el-button>
      <el-button @click="close(null)">取消</el-button>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
:global(body .custom-confirm .el-dialog__header) {
  padding-left: 34px;
  margin-bottom: 5px;
}

.icon-box {
  top: 20px;
  left: 24px;
  width: 34px;
  height: 32px;
  position: absolute;
  display: flex;
  align-items: center;
  font-size: 24px;
  color: var(--color-primary);
  &.warning {
    color: #f59e0b;
  }
  &.success {
    color: #22c55e;
  }
  &.error {
    color: #ef4444;
  }
}
.content {
  padding-left: 32px;
}
</style>
