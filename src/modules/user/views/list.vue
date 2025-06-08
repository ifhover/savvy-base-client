<script setup lang="ts">
import UserEditModal from '@/modules/user/components/userEditModal.vue'
import { ElMessage } from 'element-plus'
import { Confirm } from '@/components/confirm/index.ts'
import { ref, useTemplateRef } from 'vue'
import type { OmitPageQuery } from '@/utils/request/type.ts'
import type { User, UserListRequest } from '@/modules/user/api/type.ts'
import { userApi } from '@/modules/user/api'
import { usePage } from '@/hooks/usePage'
import PageContainer from '@/components/page-container/index.vue'
import PageCard from '@/components/page-card/index.vue'
import Flex from '@/components/flex/index.vue'
import Pagination from '@/components/pagination/index.vue'

const query = ref<OmitPageQuery<UserListRequest>>({
  keywords: ''
})

const page = usePage(() => getList())
const list = ref<User[]>()
const loading = ref(false)

async function getList() {
  const data = await userApi
    .list({
      ...query.value,
      ...page.page
    })
    .withLoading(loading)
  list.value = data.list
  page.set(data)
}

const userEditModalRef = useTemplateRef<InstanceType<typeof UserEditModal>>('userEditModalRef')

const handleEdit = (id?: string) => {
  userEditModalRef.value?.open(id)
}

async function deleteUser(id: string) {
  Confirm({
    title: '确认删除该用户?',
    async onOk() {
      await userApi.delete(id)
      page.reload()
      ElMessage.success('删除成功')
    }
  })
}
</script>

<template>
  <div>
    <user-edit-modal ref="userEditModalRef" @success="page.reload()"></user-edit-modal>
    <page-container>
      <page-card title="用户列表">
        <flex justify="space-between" class="action">
          <el-space>
            <el-button type="primary" @click="handleEdit()">新增用户</el-button>
          </el-space>
          <el-form inline>
            <el-form-item label="搜索">
              <el-input v-model="query.keywords" placeholder="搜索用户名、昵称">测试</el-input>
            </el-form-item>
            <el-button type="primary" @click="page.search()">查询</el-button>
          </el-form>
        </flex>
        <el-table :data="list" v-loading="loading">
          <el-table-column prop="name" label="用户名" />
          <el-table-column label="角色" min-width="200">
            <template v-slot="{ row }">
              <el-space>
                <el-tag v-for="role in row.roles" :key="role" disable-transitions>
                  {{ role.name }}
                </el-tag>
              </el-space>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="{ row }">
              <el-button type="primary" link @click="handleEdit(row.id)">编辑</el-button>
              <el-button type="danger" link @click="deleteUser(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination />
      </page-card>
    </page-container>
  </div>
</template>

<style lang="less" scoped>
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
