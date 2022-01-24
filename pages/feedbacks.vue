<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <Sidebar />
    <a-layout>
      <a-layout-header style="background: #fff" class="">
        <a-breadcrumb>
          <a-breadcrumb-item href=""> Home </a-breadcrumb-item>
          <a-breadcrumb-item> Feedbacks </a-breadcrumb-item>
        </a-breadcrumb>
      </a-layout-header>
      <a-layout-content class="mx-6 my-6 p-6 bg-white">
        <a-page-header title="Feedbacks" sub-title="All feedbacks by users">
          <a-row type="flex">
            <div class="flex flex-col gap-3 mt-5 lg:flex-row lg:gap-8 lg:mt-3">
              <div>
                <a-statistic title="Total feedbacks" value="0" />
              </div>
              <div>
                <a-statistic title="Positive feedbacks" :value="0" />
              </div>
              <div>
                <a-statistic title="Negative feedbacks" value="0" />
              </div>
              <div>
                <a-statistic
                  title="The last one was created"
                  :value="lastActivity"
                />
              </div>
            </div>
          </a-row>
        </a-page-header>
        <div class="mt-8">
          <a-table
            :columns="columns"
            :data-source="feedbacksData"
            :pagination="paginationFeedbacksTable"
            :loading="isLoadingFeedbacksTable"
            :scroll="{ x: 200 }"
            @change="fetchFeedbacks"
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
  name: 'FeedbacksPage',

  data() {
    return {
      collapsed: false,
      lastActivity: '',
      feedbacksData: [],
      paginationFeedbacksTable: {},
      isLoadingFeedbacksTable: true,
      totalFeedbacks: 0,
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
          title: 'Feedback',
          dataIndex: 'feedback',
          key: 'feedback',
          width: 200,
        },
        {
          title: 'Feedback created at',
          dataIndex: 'createdAt',
          key: 'createdAt',
          width: 200,
        },
      ],
    }
  },

  filters: {
    toDateFormat(val) {
      return moment(val).format('DD.MM.YYYY')
    },
    toLastActivityFormat(val) {
      return moment(val).startOf('day').fromNow()
    },
  },

  mounted() {
    this.fetchFeedbacks()
  },

  methods: {
    async fetchFeedbacks(pagination) {
      const responseFeedbacks = await this.$feathersClient
        .service('feedbacks')
        .find({
          query: {
            $sort: {
              createdAt: -1,
            },
            $skip: pagination ? (pagination.current - 1) * 10 : 0,
          },
        })
      this.feedbacksData = responseFeedbacks.data.map((feedback) => {
        return {
          ...feedback,
        }
      })
      this.lastActivity = responseFeedbacks.data.length
        ? this.$options.filters.toDateFormat(responseFeedbacks.data[0].cretedAt)
        : 'Feedbacks were not created'
      this.isLoadingFeedbacksTable = false
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
