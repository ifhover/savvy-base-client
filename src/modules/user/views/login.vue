<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { nextTick, onMounted, ref, useTemplateRef } from 'vue'
import CaptchaInput from '@/components/captcha-input/index.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore.ts'
import type { UserLoginRequest } from '@/modules/user/api/type.ts'
import { userApi } from '@/modules/user/api'

const nameRef = useTemplateRef<HTMLInputElement>('nameRef')

onMounted(() => {
  if (!userStore.isExpire) {
    router.push({
      name: 'home',
      replace: true
    })
    return
  }
  nextTick(() => {
    nameRef.value?.focus()
  })
})

const form = ref<UserLoginRequest>({
  name: '',
  password: '',
  captcha_id: '',
  captcha_value: ''
})

const rules: FormRules<UserLoginRequest> = {
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha_value: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }]
}

const captchaRef = useTemplateRef<InstanceType<typeof CaptchaInput>>('captchaRef')

const userStore = useUserStore()
const router = useRouter()

const loading = ref(false)
const login = async () => {
  try {
    await formRef.value?.validate()
    userStore.token = await userApi.login(form.value).withLoading(loading)
    ElMessage.success('登录成功')
    router.replace({ name: 'home' })
  } catch (e) {
    captchaRef.value?.refresh()
    return Promise.reject(e)
  }
}

const formRef = useTemplateRef<FormInstance>('formRef')
</script>

<template>
  <div class="login">
    <div class="container">
      <div class="header">
        <div class="icon-box">
          <div class="i-mdi:account-arrow-up-outline icon"></div>
        </div>
      </div>
      <div class="h1">欢迎回来</div>
      <div class="h2">请输入你的登录信息</div>
      <el-form label-position="top" ref="formRef" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="name">
          <el-input ref="nameRef" v-model="form.name" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" />
        </el-form-item>
        <el-form-item label="验证码" prop="captcha_value">
          <captcha-input
            v-model:value="form.captcha_value"
            v-model:id="form.captcha_id"
            type="login"
            ref="captchaRef"
            @keydown.enter="login()"
          />
        </el-form-item>
      </el-form>
      <el-button type="primary" class="submit" @click="login" :loading="loading">登录</el-button>
      <div class="guide-text">by sudden3</div>
    </div>
  </div>
</template>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: #f2f3f3;
  position: relative;
  > .container {
    --width: 350px;
    margin-top: 20vh;
    width: var(--width);
    background-color: white;
    padding: 20px 15px;
    border: 4px solid white;
    border-bottom: none;
    overflow: hidden;
    position: relative;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    &::before {
      content: ' ';
      position: absolute;
      width: var(--width);
      height: var(--width);
      border-radius: 50%;
      top: calc(0px - var(--width));
      left: 0;
      box-shadow: 0 0 100px 20px var(--color-primary);
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 10px;
      .icon-box {
        position: relative;
        z-index: 1;
        background-image: linear-gradient(170deg, var(--color-primary) 0%, rgba(0, 0, 0, 0) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        box-shadow: inset 0 -1px 5px 1px rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        .icon {
          font-size: 27px;
          color: white;
          opacity: 0.9;
        }
      }
    }
    .h1 {
      text-align: center;
      font-size: 20px;
      color: black;
      margin-top: 20px;
    }
    .h2 {
      margin-top: 8px;
      text-align: center;
      color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
      margin-bottom: 40px;
    }
    .submit {
      width: 100%;
      margin-top: 5px;
    }
    .guide-text {
      text-align: center;
      margin-top: 18px;
      padding-bottom: 5px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
