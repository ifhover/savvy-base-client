<script setup lang="ts">
import RoleEditModal from '@/modules/role/components/roleEditModal.vue'
import { onMounted, reactive, ref, useTemplateRef } from 'vue'
import type { Role, RoleListRequest } from '@/modules/role/api/type.ts'
import { roleApi } from '@/modules/role/api'
import PageContainer from '@/components/page-container/index.vue'
import PageCard from '@/components/page-card/index.vue'
import { Confirm } from '@/components/confirm/index.ts'
import Flex from '@/components/flex/index.vue'
import { ElMessage } from 'element-plus'

const query: RoleListRequest = reactive({
  keywords: ''
})

const list = ref<Role[]>([])

async function getList() {
  list.value = await roleApi.all(query)
}

const handleEdit = (id?: string) => {
  roleEditModalRef.value?.open(id)
}

const handleDelete = (role: Role) => {
  Confirm({
    title: '删除确认',
    content: `确定要删除角色"${role.name}"？`,
    async onOk() {
      roleApi.delete(role.id).then(() => {
        getList()
        ElMessage.success('删除成功')
      })
    }
  })
}

onMounted(() => {
  getList()
})

const roleEditModalRef = useTemplateRef<InstanceType<typeof RoleEditModal>>('roleEditModalRef')
</script>

<template>
  <page-container>
    <role-edit-modal ref="roleEditModalRef" @update="getList" />
    <page-card title="角色列表">
      <flex justify="space-between" class="action">
        <el-space>
          <el-button type="primary" @click="handleEdit()">新增角色</el-button>
        </el-space>
        <el-form inline>
          <el-form-item label="搜索">
            <el-input v-model="query.keywords" placeholder="搜索用户名、昵称">测试</el-input>
          </el-form-item>
          <el-button type="primary" @click="getList">查询</el-button>
        </el-form>
      </flex>
      <el-table :data="list">
        <el-table-column prop="name" label="角色名称"></el-table-column>
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
