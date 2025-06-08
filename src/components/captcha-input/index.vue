<script setup lang="ts">
import { captchaApi } from '@/api/captcha'
import { ref } from 'vue'

const value = defineModel<string>('value')
const id = defineModel<string>('id')
const base64 = ref('')

const emit = defineEmits<{
  (e: 'keydown.enter'): void
}>()

const loading = ref(false)

async function getData() {
  const data = await captchaApi.getCaptcha().withLoading(loading)
  id.value = data.id
  base64.value = data.base64
}
getData()

defineExpose({
  refresh() {
    getData()
  }
})
</script>

<template>
  <div class="captcha-input">
    <el-input @keydown.enter="emit('keydown.enter')" v-model="value"></el-input>
    <div class="img-box" v-loading="loading">
      <img :src="base64" alt="" @click="getData()" />
    </div>
  </div>
</template>

<style>
.captcha-input {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 100px;
  grid-column-gap: 10px;
  .img-box {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
      display: block;
    }
  }
}
</style>
