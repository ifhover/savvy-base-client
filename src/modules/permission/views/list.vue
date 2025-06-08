<script setup lang="ts">
import { nextTick, onMounted, ref, useTemplateRef } from 'vue'
import { permissionApi } from '../api'
import PageContainer from '@/components/page-container/index.vue'
import PageCard from '@/components/page-card/index.vue'
import { Confirm } from '@/components/confirm/index.ts'
import Flex from '@/components/flex/index.vue'
import { ElMessage, ElTable } from 'element-plus'
import type { Permission, PermissionForm } from '../api/type'
import PermissionFormModal from '../components/permissionFormModal.vue'

const list = ref<Permission[]>([])

async function getList() {
  list.value = await permissionApi.tree()
  await nextTick()
  function recursionExpand(list: Permission[]) {
    list.forEach((item) => {
      if (item.children && item.children.length > 0) {
        tableRef?.value?.toggleRowExpansion(item, true)
        recursionExpand(item.children)
      }
    })
  }
  recursionExpand(list.value)
}

const openFormModal = (fill?: Partial<PermissionForm>) => {
  formModalRef.value?.open(fill)
}

const handleDelete = (item: PermissionForm) => {
  Confirm({
    title: '删除确认',
    content: `确定要删除权限"${item.name}"？`,
    async onOk() {
      permissionApi.delete(item.id).then(() => {
        getList()
        ElMessage.success('删除成功')
      })
    }
  })
}

onMounted(() => {
  getList()
})

const formModalRef = useTemplateRef<InstanceType<typeof PermissionFormModal>>('formModalRef')
const tableRef = useTemplateRef<InstanceType<typeof ElTable>>('tableRef')
</script>

<template>
  <page-container>
    <permission-form-modal ref="formModalRef" @update="getList" />
    <page-card title="权限列表">
      <flex justify="space-between" class="action">
        <el-space>
          <el-button type="primary" @click="openFormModal()">新增权限</el-button>
        </el-space>
        <el-form inline>
          <el-button type="primary" @click="getList">查询</el-button>
        </el-form>
      </flex>
      <el-table :data="list" row-key="id" default-expand-all ref="tableRef">
        <el-table-column prop="name" label="权限名称"></el-table-column>
        <el-table-column prop="code" label="权限编码"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button link type="primary" @click="openFormModal({ id: row.id })">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </page-card>
  </page-container>
</template>
