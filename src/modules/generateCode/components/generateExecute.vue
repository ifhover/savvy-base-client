<script setup lang="ts">
import type { GenerateCodeExecuteRequest } from '@/modules/generateCode/api/type.ts'
import { generateCodedApi } from '@/modules/generateCode/api'
import { ref, watch } from 'vue'

const props = defineProps<{
  option: GenerateCodeExecuteRequest
}>()

const emit = defineEmits<{
  back: []
}>()

const backEndFiles = ref<string[]>([])
async function generateBackEnd() {
  backEndFiles.value = await generateCodedApi.backEnd(props.option)
}

watch(
  props.option,
  () => {
    backEndFiles.value = []
  },
  {
    deep: true
  }
)

async function downloadFront() {
  let res = await generateCodedApi.frontEnd(props.option)
  const link = document.createElement('a')
  link.href = res.file_path
  link.setAttribute('download', res.file_name)
  link.click()
  window.URL.revokeObjectURL(link.href)
}
</script>

<template>
  <div class="generate-execute">
    <div class="action">
      <el-button @click="emit('back')" link type="primary">
        <i class="i-mdi-arrow-left"></i>
        返回上一步
      </el-button>
    </div>
    <div class="content-box">
      <div class="column-item">
        <div class="head">
          <div class="title">前端代码</div>
        </div>
        <el-button type="primary" @click="downloadFront">生成并下载</el-button>
      </div>
      <div class="column-item">
        <div class="head">
          <div class="title">后端代码</div>
          <el-tag type="info" v-if="backEndFiles.length === 0">待生成</el-tag>
          <el-tag type="primary" v-else>已生成</el-tag>
        </div>
        <div class="content" v-if="backEndFiles.length">
          <div v-for="item in backEndFiles" :key="item">
            {{ item }}
          </div>
        </div>
        <el-button type="primary" @click="generateBackEnd" v-if="backEndFiles.length === 0">生成</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.generate-execute {
  .content-box {
    padding: 0 40px;
    display: flex;
    align-items: stretch;
    .column-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;
      row-gap: 15px;

      &:first-child {
        border-right: 1px solid #eee;
      }

      > .head {
        display: flex;
        align-items: center;
        column-gap: 5px;

        .title {
          font-weight: 500;
          font-size: 18px;
        }
      }
      > .content {
        padding-left: 100px;
        display: grid;
        row-gap: 10px;
        color: #11a841;
      }
    }
  }
  .action {
    display: flex;
    margin-bottom: 20px;
    i {
      margin-right: 3px;
    }
  }
}
</style>
