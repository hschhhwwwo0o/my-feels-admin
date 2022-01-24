<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <Sidebar />
    <a-layout>
      <a-layout-header style="background: #fff" class="px-2 flex items-center">
        <a-breadcrumb>
          <a-breadcrumb-item href=""> Home </a-breadcrumb-item>
          <a-breadcrumb-item> Suggestions </a-breadcrumb-item>
        </a-breadcrumb>
      </a-layout-header>
      <a-layout-content class="mx-6 my-6 p-6 bg-white">
        <a-page-header title="Suggestions" sub-title="All active suggestions">
          <a-row type="flex">
            <div class="flex flex-col gap-3 mt-5 lg:flex-row lg:gap-8 lg:mt-3">
              <div>
                <a-statistic title="Total users" value="0" />
              </div>
              <div>
                <a-statistic
                  title="Last activity"
                  value="Suggestions were not created"
                />
              </div>
            </div>
          </a-row>
        </a-page-header>
        <div class="mt-8">
          <a-list item-layout="horizontal" :data-source="[]">
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">Remove</a>
              <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
                <a slot="title" href="https://www.antdv.com/">{{
                  item.title
                }}</a>
                <a-avatar slot="avatar">
                  <div style="margin-top: -2px">
                    <a-icon type="user" />
                  </div>
                </a-avatar>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: 'SuggestionsPage',
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
