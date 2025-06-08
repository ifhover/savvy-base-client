<script setup lang="ts">
import SlideMenu from '@/layout/components/slide-menu.vue'
import LayoutHeader from '@/layout/components/layout-header.vue'
</script>

<template>
  <div class="admin-layout">
    <div class="left-slide">
      <div class="fixed-container">
        <div class="logo">
          <div class="text">Savvy</div>
        </div>
        <div class="menu-box">
          <slide-menu />
        </div>
      </div>
    </div>
    <div class="right-container">
      <layout-header />
      <div class="content">
        <Suspense>
          <template #default>
            <router-view></router-view>
          </template>
          <template #fallback>
            <div class="loading">loading...</div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f7f7f9;
  --content-width: 1400px;
  > .left-slide {
    width: 260px;
    background: white;
    .fixed-container {
      position: fixed;
      width: 260px;
      height: 100%;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      > * {
        flex-shrink: 0;
      }
      .logo {
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        .text {
          font-size: 26px;
          margin-left: 10px;
          font-weight: 700;
          font-family:
            Segoe Print,
            serif;
          color: rgba(0, 0, 0, 0.7);
        }
      }
      .menu-box {
        flex: 1;
        overflow-y: auto;
      }
    }
  }
  > .right-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    > .content {
      width: 100%;
      max-width: var(--content-width);
    }
  }
}
</style>
