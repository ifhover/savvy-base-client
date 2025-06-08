<script setup lang="ts">
import menuEditModal from '@/modules/menu/components/menuEditModal.vue'
import { nextTick, onMounted, ref, useTemplateRef } from 'vue'
import type { Menu } from '@/modules/menu/api/type.ts'
import { menuApi } from '@/modules/menu/api'
import PageContainer from '@/components/page-container/index.vue'
import PageCard from '@/components/page-card/index.vue'
import { Confirm } from '@/components/confirm/index.ts'
import Flex from '@/components/flex/index.vue'
import { ElMessage, type ElTable } from 'element-plus'
import Icon from '@/components/icon/index.vue'

const list = ref<Menu[]>([])
const tableRef = useTemplateRef<InstanceType<typeof ElTable>>('tableRef')

async function getList() {
  list.value = await menuApi.tree()
  await nextTick()
  function recursionExpand(list: Menu[]) {
    list.forEach((item) => {
      if (item.children && item.children.length > 0) {
        tableRef?.value?.toggleRowExpansion(item, true)
        recursionExpand(item.children)
      }
    })
  }
  recursionExpand(list.value)
}

const handleEdit = (id?: string) => {
  menuEditModalRef.value?.open(id)
}

const handleDelete = (item: Menu) => {
  Confirm({
    title: '删除确认',
    content: `确定要删除吗？`,
    async onOk() {
      menuApi.delete(item.id).then(() => {
        getList()
        ElMessage.success('删除成功')
      })
    }
  })
}

const menuEditModalRef = useTemplateRef<InstanceType<typeof menuEditModal>>('menuEditModalRef')

onMounted(() => {
  getList()
})
</script>

<template>
  <page-container>
    <menu-edit-modal ref="menuEditModalRef" @update="getList" />
    <page-card title="菜单列表">
      <flex justify="space-between" class="action">
        <el-space>
          <el-button type="primary" @click="handleEdit()">新增菜单</el-button>
        </el-space>
        <el-form inline>
          <el-button type="primary" @click="getList">查询</el-button>
        </el-form>
      </flex>
      <el-table :data="list" row-key="id" ref="tableRef">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="icon" label="图标" width="200px">
          <template v-slot="{ row }">
            <flex align="center">
              <icon :type="row.icon"></icon>
            </flex>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="页面路径"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button link type="primary" @click="handleEdit(row.id)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </page-card>
  </page-container>
</template>
