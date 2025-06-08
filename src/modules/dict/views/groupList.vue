<script setup lang="ts">
import { useTemplateRef } from 'vue'
import PageContainer from '@/components/page-container/index.vue'
import PageCard from '@/components/page-card/index.vue'
import { Confirm } from '@/components/confirm/index.ts'
import Flex from '@/components/flex/index.vue'
import { ElMessage } from 'element-plus'
import DictGroupFormModal from '@/modules/dict/components/dictGroupFormModal.vue'
import type { DictGroup } from '@/modules/dict/api/type.ts'
import { dictGroupApi } from '@/modules/dict/api/group.ts'
import { usePageRequest } from '@/hooks/usePageRequest'
import DictModal from '@/modules/dict/components/dictModal.vue'
import Pagination from '@/components/pagination/index.vue'

const { reload, loading, list, search, params } = usePageRequest(dictGroupApi.list, {
  params: {
    keywords: ''
  }
})

const handleEdit = (id?: string) => {
  formModalRef.value?.open(id)
}

const handleDelete = (dictGroup: DictGroup) => {
  Confirm({
    title: '删除确认',
    content: `确定要删除分组"${dictGroup.code}" 及其字典？`,
    async onOk() {
      dictGroupApi.delete(dictGroup.id).then(() => {
        reload()
        ElMessage.success('删除成功')
      })
    }
  })
}

const formModalRef = useTemplateRef<InstanceType<typeof DictGroupFormModal>>('formModalRef')
const listModalRef = useTemplateRef<InstanceType<typeof DictModal>>('listModalRef')

function openListModal(dictGroup: DictGroup) {
  listModalRef.value?.open(dictGroup.code)
}
</script>

<template>
  <page-container>
    <dict-group-form-modal ref="formModalRef" @update="reload" />
    <dict-modal ref="listModalRef" />
    <page-card title="字典分组列表" v-loading="loading">
      <flex justify="space-between" class="action">
        <el-space>
          <el-button type="primary" @click="handleEdit()">新增分组</el-button>
        </el-space>
        <el-form inline>
          <el-form-item label="搜索">
            <el-input v-model="params.keywords" placeholder="搜索分组备注、编码">测试</el-input>
          </el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form>
      </flex>
      <el-table :data="list">
        <el-table-column prop="code" label="分组代码"></el-table-column>
        <el-table-column prop="remark" label="分组备注"></el-table-column>
        <el-table-column label="字典列表">
          <template v-slot="{ row }">
            <el-space>
              <el-button link type="primary" @click="openListModal(row)">查看</el-button>
            </el-space>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button link type="primary" @click="handleEdit(row.id)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination />
    </page-card>
  </page-container>
</template>
