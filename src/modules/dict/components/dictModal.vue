<script lang="ts" setup>
import { dictApi } from '@/modules/dict/api/item.ts'
import { ref, useTemplateRef } from 'vue'
import type { Dict } from '@/modules/dict/api/type.ts'
import DictFormModal from '@/modules/dict/components/dictFormModal.vue'
import Flex from '@/components/flex/index.vue'
import { Confirm } from '@/components/confirm/index.ts'
import { ElMessage } from 'element-plus'

const list = ref<Dict[]>([])

const dictGroupCode = ref('')
async function getList() {
  list.value = await dictApi.list({
    group_code: dictGroupCode.value
  })
}

defineExpose({
  open(code: string) {
    dictGroupCode.value = code
    getList()
    visible.value = true
  }
})

const visible = ref(false)
const formRef = useTemplateRef<InstanceType<typeof DictFormModal>>('formRef')
function openFormModal(data: Partial<Dict>) {
  formRef.value?.open(data)
}

function deleteDict(item: Dict) {
  Confirm({
    title: '删除确认',
    content: `确定要删除字典 "${item.value}(${item.name})" 吗？`,
    onOk: async () => {
      await dictApi.delete(item.id)
      ElMessage.success('删除成功')
      getList()
    }
  })
}
</script>

<template>
  <dict-form-modal ref="formRef" @update="getList" />
  <el-dialog title="字典列表" v-model="visible" :close-on-click-modal="false" width="800px">
    <flex vertical>
      <flex justify="space-between">
        <el-button type="primary" @click="openFormModal({ group_code: dictGroupCode })">添加字典</el-button>
        <el-button @click="getList">刷新数据</el-button>
      </flex>
      <el-table :data="list">
        <el-table-column prop="value" label="值" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="sort" label="优先级" width="120px" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" width="120px">
          <template v-slot="{ row }">
            <el-button link type="primary" @click="openFormModal({ id: row.id })">编辑</el-button>
            <el-button link type="danger" @click="deleteDict(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </flex>
  </el-dialog>
</template>
