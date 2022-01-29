<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <Sidebar />
    <a-layout>
      <a-layout-header style="background: #fff" class="px-2 flex items-center">
        <a-breadcrumb>
          <a-breadcrumb-item href=""> Home </a-breadcrumb-item>
          <a-breadcrumb-item> Users </a-breadcrumb-item>
        </a-breadcrumb>
      </a-layout-header>
      <a-layout-content class="mx-6 mt-6 p-6 bg-white">
        <a-page-header title="Users" sub-title="All active users">
          <a-row type="flex">
            <div class="flex flex-col gap-3 mt-5 lg:flex-row lg:gap-8 lg:mt-3">
              <div>
                <a-statistic title="Total users" :value="totalUsers" />
              </div>
              <div>
                <a-statistic title="Last activity" :value="lastActivityDate" />
              </div>
            </div>
          </a-row>
        </a-page-header>
        <div class="mt-8">
          <a-table
            :columns="columns"
            :data-source="usersData"
            :pagination="paginationUsersTable"
            :loading="isLoadingUsersTable"
            :scroll="{ x: 500 }"
            @change="fetchUsers"
          >
          </a-table>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import moment from 'moment'

export default {
  name: 'IndexPage',

  filters: {
    toDateFormat(val) {
      return moment(val).format('DD.MM.YYYY')
    },
    toLastActivityFormat(val) {
      return moment(val).startOf('day').fromNow()
    },
  },

  data() {
    return {
      collapsed: false,
      usersData: [],
      totalUsers: 0,
      lastActivityDate: '',
      paginationUsersTable: {},
      isLoadingUsersTable: true,
      columns: [
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName',
          width: 200,
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName',
          width: 200,
        },
        {
          title: 'E-mail',
          dataIndex: 'email',
          key: 'email',
          width: 200,
        },
        {
          title: 'Theme',
          dataIndex: 'theme',
          key: 'theme',
          width: 200,
        },
        {
          title: 'Created at',
          dataIndex: 'createdAt',
          key: 'createdAt',
          width: 200,
        },
        {
          title: 'Updated at',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
          width: 200,
        },
      ],
    }
  },

  mounted() {
    this.fetchUsers()
  },

  methods: {
    async fetchUsers(pagination) {
      try {
        const response = await this.$feathersClient.service('users').find({
          query: {
            $sort: {
              createdAt: -1,
            },
            $skip: pagination ? (pagination.current - 1) * 10 : 0,
          },
        })
        this.lastActivityDate = String(new Date(response.data[0].createdAt))
        this.usersData = response.data.map((user) => {
          return {
            ...user,
            firstName: user.firstName ? user.firstName : '―',
            theme: user.theme ? user.theme : '―',
            lastName: user.lastName ? user.lastName : '―',
            createdAt: this.$options.filters.toDateFormat(user.createdAt),
            updatedAt: this.$options.filters.toDateFormat(user.updatedAt),
          }
        })
        this.paginationUsersTable = {
          total: response.total,
        }
        this.totalUsers = response.total
        this.isLoadingUsersTable = false
      } catch (error) {
        this.$message.error('An error occurred while loading users')
      }
    },
  },
}
</script>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

.ant-layout {
  min-height: 100vh;
}
</style>
