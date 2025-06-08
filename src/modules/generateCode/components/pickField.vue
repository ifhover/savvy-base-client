<script lang="ts" setup>
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { generateCodedApi } from '@/modules/generateCode/api'
import type { GenerateCodeExecuteRequest } from '@/modules/generateCode/api/type.ts'
import Flex from '@/components/flex/index.vue'
import type { ElForm } from 'element-plus'
import { pascalCase } from 'change-case'

const tables = ref<string[]>([])

async function getTables() {
  tables.value = await generateCodedApi.tables()
}

onMounted(() => {
  getTables()
})

const formData = defineModel<GenerateCodeExecuteRequest>({
  required: true
})

async function getTableColumns() {
  if (formData.value.name) {
    generateCodedApi.columns(formData.value.name).then((data) => {
      formData.value.fields = data.map((item) => {
        return {
          label: '',
          column: item.name,
          required: item.required,
          is_primary: item.is_primary
        }
      })
    })
  }
}

const emit = defineEmits<{
  next: []
}>()

async function nextStep() {
  await formRef?.value?.validate()
  emit('next')
}

const rules = {
  label: [{ required: true, message: '请输入中文名称', trigger: 'blur' }],
  name: [{ required: true, message: '请选择数据表', trigger: 'blur' }]
}

const formRef = useTemplateRef<InstanceType<typeof ElForm>>('formRef')
</script>

<template>
  <div class="pick-field">
    <el-form :model="formData" :rules="rules" ref="formRef">
      <div class="head-action">
        <flex justify="space-between">
          <div class="line-inline">
            <el-form-item label="数据表" prop="name">
              <el-select
                v-model="formData.name"
                placeholder="选择一个表"
                style="width: 200px"
                @change="getTableColumns"
              >
                <el-option v-for="item in tables" :key="item" :value="item">{{ item }}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="中文名称" prop="label">
              <el-input v-model="formData.label" placeholder="如 用户"></el-input>
            </el-form-item>
          </div>
        </flex>
      </div>
      <el-table :data="formData.fields" class="align-top hide-gap">
        <el-table-column prop="column" label="Column"></el-table-column>
        <el-table-column prop="label" label="Label">
          <template v-slot="{ row }">
            <el-form-item v-if="!['id', 'created_at', 'updated_at'].includes(row.column)">
              <el-input v-model="row.label"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="is_primary" label="主键" width="200px">
          <template v-slot="{ row }">
            <el-switch v-model="row.is_primary" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="required" label="是否必填" width="200px">
          <template v-slot="{ row }">
            <el-switch v-model="row.required" disabled></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer-action">
        <el-button type="primary" :disabled="formData.fields.length === 0" @click="nextStep">下一步</el-button>
      </div>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.pick-field {
  .head-action {
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .footer-action {
    text-align: right;
    margin-top: 12px;
  }
}
</style>
