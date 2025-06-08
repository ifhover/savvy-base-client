<script setup lang="ts">
import PageCard from '@/components/page-card/index.vue'
import PageContainer from '@/components/page-container/index.vue'
import { computed, h, ref } from 'vue'
import PickField from '@/modules/generateCode/components/pickField.vue'
import type { GenerateCodeExecuteRequest } from '@/modules/generateCode/api/type.ts'
import { generateCodedApi } from '@/modules/generateCode/api'
import { useFormData } from '@/hooks/useFormData'
import GenerateExecute from '@/modules/generateCode/components/generateExecute.vue'
import { ElMessageBox } from 'element-plus'

const step = ref(0)

const { formData, resetData } = useFormData<GenerateCodeExecuteRequest>({
  name: '',
  label: '',
  fields: []
})

const errors = ref<string[]>([])
const visible = ref(false)

async function nextStep() {
  errors.value = await generateCodedApi.checkBackEnd(formData.value)
  if (errors.value.length > 0) {
    visible.value = true
  } else {
    step.value += 1
  }
}
</script>

<template>
  <PageContainer title="代码生成">
    <el-dialog v-model="visible" title="发生错误" width="600px" :close-on-click-modal="false">
      <div class="errors" style="display: grid; row-gap: 15px">
        <div v-for="item in errors" :key="item">{{ item }}</div>
      </div>
      <template #footer>
        <el-button type="primary" @click="visible = false">确定</el-button>
      </template>
    </el-dialog>
    <PageCard title="代码生成">
      <el-steps :active="step" finish-status="success" align-center>
        <el-step title="选择字段" />
        <el-step title="生成结果" />
      </el-steps>
      <div class="step-content">
        <pick-field v-if="step === 0" v-model="formData" @next="nextStep"></pick-field>
        <generate-execute v-if="step === 1" @back="step = 0" :option="formData" />
      </div>
    </PageCard>
  </PageContainer>
</template>

<style lang="less" scoped>
.step-content {
  margin-top: 12px;
}
</style>
