<script setup lang="ts">
import PageCard from '@/components/page-card/index.vue'
import { useUserStore } from '@/stores/userStore.ts'
import { useFormData } from '@/hooks/useFormData'
import type { UserUpdateMyRequest } from '@/modules/user/api/type.ts'
import Flex from '@/components/flex/index.vue'
import { userApi } from '@/modules/user/api'
import { ElMessage } from 'element-plus'
import PageContainer from '@/components/page-container/index.vue'
import Icon from '@/components/icon/index.vue'

const userStore = useUserStore()

const { formData, validForm } = useFormData<UserUpdateMyRequest>({
  name: userStore.myProfile?.name ?? '',
  password: '',
  confirm_password: ''
})

const rules = {
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  confirm_password: [
    {
      trigger: 'change',
      validator: (rule: any, value: any, callback: any) => {
        if (value !== formData.value.password) {
          callback(new Error('两次密码不一致'))
        }
        callback()
      }
    }
  ]
}

async function submit() {
  await validForm()
  await userApi.updateMy(formData.value)
  ElMessage.success('更新成功')
  userStore.getMyProfile()
}

</script>

<template>
  <page-container title="个人中心" :breadcrumb="false">
    <div class="container">
      <div class="left">
        <page-card>
          <div class="profile-content">
            <div class="avatar">
              <el-avatar type="string" :size="100">{{ userStore.myProfile?.name }}</el-avatar>
            </div>
            <div class="name">{{ userStore.myProfile?.name }}</div>
            <div class="roles">
              <el-tag v-for="item in userStore.myProfile?.roles">{{ item.name }}</el-tag>
            </div>
          </div>
        </page-card>
      </div>
      <page-card title="编辑信息" class="right">
        <div class="content">
          <el-form label-width="80px" :model="formData" ref="formRef" :rules="rules">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input placeholder="不作修改请留空" v-model="formData.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirm_password" v-if="formData.password.length">
              <el-input placeholder="再次输入密码" v-model="formData.confirm_password"></el-input>
            </el-form-item>
            <flex justify="end">
              <el-button type="primary" @click="submit">保存</el-button>
            </flex>
          </el-form>
        </div>
      </page-card>
    </div>
  </page-container>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  column-gap: 12px;
  > .left {
    width: 350px;
    .profile-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .avatar {
        margin-bottom: 20px;
      }
      .nick-name {
        font-size: 20px;
        font-weight: 500;
      }
      .name {
        color: var(--gray-500);
        font-size: 14px;
        margin-top: 5px;
      }
      .roles {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        column-gap: 10px;
        row-gap: 5px;
      }
    }
  }
  > .right {
    flex: 1;
  }
}
.content {
  max-width: 500px;
  margin: 0 auto;
}
</style>
