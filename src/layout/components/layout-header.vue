<script setup lang="ts">
import { Confirm } from '@/components/confirm'
import { useUserStore } from '@/stores/userStore.ts'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import Icon from '@/components/icon/index.vue'

const userStore = useUserStore()
const router = useRouter()
function logout() {
  Confirm({
    title: '确定要退出登录吗？',
    async onOk() {
      userStore.logout()
      await router.replace({ name: 'login' })
      ElMessage.success('退出登录成功')
    }
  })
}
</script>

<template>
  <div class="admin-header">
    <div class="container">
      <div class="search">
        <i class="icon i-mdi-magnify"></i>
        <input placeholder="search" />
      </div>
      <div class="panel">
        <el-dropdown>
          <div class="user">
            <div class="avatar">
              <el-avatar :size="35">{{userStore.myProfile?.name?.[0]}}</el-avatar>
            </div>
            <div class="profile">
              <div class="name">{{ userStore.myProfile?.name }}</div>
              <div class="role">{{ userStore.myProfile?.roles[0]?.name }}</div>
            </div>
          </div>
          <template #dropdown>
            <div class="user-dropdown">
              <div class="user-info">
                <el-avatar :size="40">{{userStore.myProfile?.name?.[0]}}</el-avatar>
                <div class="detail">
                  <div class="name">{{ userStore.myProfile?.name }}</div>
                </div>
              </div>
              <div class="line"></div>
              <div class="menu-list">
                <router-link to="/user/my" class="menu-item">
                  <i class="icon i-mdi-account-box-edit-outline"></i>
                  个人设置
                </router-link>
              </div>
              <div class="line"></div>
              <el-button class="logout-btn" type="danger" @click="logout">
                <i class="icon i-mdi-arrow-right-circle"></i>
                退出登录
              </el-button>
            </div>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.admin-header {
  width: 100%;
  height: 55px;
  margin-bottom: 20px;
  background-color: white;
  > .container {
    width: var(--content-width);
    margin: 0 auto;
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    > .search {
      display: flex;
      align-items: center;
      .icon {
        font-size: 18px;
        color: var(--slate-600);
      }
      input {
        background-color: rgba(0, 0, 0, 0);
        outline: none;
        border: none;
        margin-left: 5px;
        padding-left: 10px;
      }
    }
    > .panel {
      display: flex;
      align-items: center;
      column-gap: 12px;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          background-color: var(--slate-200);
        }
        .icon {
          font-size: 18px;
          color: var(--slate-800);
        }
      }
      .user {
        margin-left: 4px;
        display: flex;
        align-items: center;
        column-gap: 10px;
        .avatar {
          position: relative;
          &::after {
            content: ' ';
            position: absolute;
            right: -2px;
            bottom: -1px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: limegreen;
            border: 2px solid white;
          }
        }
        .profile {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          .name {
            color: black;
            margin-bottom: 5px;
          }
          .role {
            display: flex;
            font-size: 12px;
            padding: 2px 5px;
            background-color: var(--el-color-primary-light-9);
            color: var(--el-color-primary);
            border: 1px solid var(--el-color-primary-light-7);
            border-radius: 4px;
          }
        }
      }
    }
  }
}

.user-dropdown {
  width: 220px;
  padding: 10px 0;
  .user-info {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 15px;
    .detail {
      .name {
        font-size: 13px;
        margin-left: 10px;
        color: var(--slate-700);
      }
    }
  }
  .line {
    margin: 3px 0;
    width: 100%;
    height: 1px;
    background-color: var(--gray-100);
  }
  .menu-list {
    .menu-item {
      width: 100%;
      padding: 0 15px;
      height: 35px;
      display: flex;
      align-items: center;
      font-size: 15px;
      cursor: pointer;
      color: var(--slate-700);
      &:hover {
        background-color: var(--gray-100);
      }
      .icon {
        font-size: 16px;
        margin-right: 5px;
      }
    }
  }
  .logout-btn {
    margin-top: 10px;
    width: calc(100% - 30px);
    margin-left: 15px;
    .icon {
      margin-right: 5px;
    }
  }
}
</style>
