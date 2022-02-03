<template>
  <span>
    <a-layout-header
      :style="{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }"
    >
      <a-menu
        v-model="routs"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="/users">
          <nuxt-link to="/">
            <div class="flex flex-row gap-2">
              <div>
                <span class="mt-1 text-gray-800">Users</span>
              </div>
            </div>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="/feedbacks">
          <nuxt-link to="/feedbacks">
            <div class="flex flex-row gap-2">
              <div>
                <span class="mt-1 text-gray-800">Feedback</span>
              </div>
            </div>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="/suggestions">
          <nuxt-link to="/suggestions">
            <div class="flex flex-row gap-2">
              <div>
                <span class="mt-1 text-gray-800">Suggestions</span>
              </div>
            </div>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="/logout" @click="onLogOutHandler">
          <div class="flex flex-row gap-2">
            <div>
              <span class="mt-1 text-gray-800">Log out</span>
            </div>
          </div>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
  </span>
</template>

<script>
import feathersClient from '../utils/feathers'

export default {
  name: 'NuxtSidebar',

  data: () => {
    return {
      routs: [],
    }
  },

  mounted() {
    feathersClient
      .reAuthenticate()
      .then((data) => {
        if (data.user.email === 'my-feels@admin.com') {
          this.initRouting()
        } else {
          throw Object.assign(new Error('Error'), { code: 401 })
        }
      })
      .catch(() => {
        this.$router.push('/login')
      })
  },

  methods: {
    initRouting() {
      if (this.$router.history.current.fullPath === '/') {
        this.routs = ['/users']
      }
      if (this.$router.history.current.fullPath === '/feedbacks') {
        this.routs = ['/feedbacks']
      }
      if (this.$router.history.current.fullPath === '/suggestions') {
        this.routs = ['/suggestions']
      }
    },

    async onLogOutHandler() {
      await feathersClient.logout()
      await this.$router.push('/login')
    },
  },
}
</script>
