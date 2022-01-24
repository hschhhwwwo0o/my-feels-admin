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
            </div>
          </a-row>
        </a-page-header>
        <div class="mt-8">
          <a-table :columns="columns" :data-source="[]"> </a-table>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  name: 'FeedbacksPage',
  data() {
    return {
      collapsed: false,
      columns: [
        {
          title: 'First Name',
          dataIndex: 'name',
          key: 'name',
          width: 200,
        },
        {
          title: 'Last Name',
          dataIndex: 'age',
          key: 'age',
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
          title: 'User created at',
          dataIndex: 'userCreatedAt',
          key: 'userCreatedAt',
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
          dataIndex: 'feedbackCreatedAt',
          key: 'feedbackCreatedAt',
          width: 200,
        },
      ],
    }
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
  height: 100vh;
}
</style>
