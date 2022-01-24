<template>
  <div class="max-h-screen overflow-hidden">
    <a-layout>
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
          <a-menu-item key="/login">
            <nuxt-link to="/login">
              <div class="flex flex-row gap-2">
                <div>
                  <span class="mt-1">Login</span>
                </div>
              </div>
            </nuxt-link>
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content>
        <div class="p-6">
          <main class="flex items-center bg-white flex-col w-full h-screen">
            <div class="mt-10 flex flex-col gap-3 w-full px-10 lg:w-96">
              <div class="mt-28">
                <h1 class="text-3xl text-center">Login</h1>
              </div>
              <a-input
                v-model="email"
                placeholder="Input e-mail..."
                size="large"
              />
              <a-input-password
                v-model="password"
                placeholder="Input password..."
                size="large"
              />
              <a-button type="primary" size="large" @click="login">
                Login
              </a-button>
            </div>
          </main>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  data() {
    return {
      email: '',
      password: '',
      routs: ['/login'],
    }
  },

  methods: {
    async login() {
      try {
        const data = await this.$feathersClient.authenticate({
          strategy: 'local',
          email: this.email,
          password: this.password,
        })

        if (data.user.email === 'my-feels@admin.com') {
          this.$message.success('You are successfully logged in as an admin', 2)
        } else {
          this.localStorage.setitem('feathers-jwt', '')
        }

        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      } catch (error) {
        this.$message.error('Something went wrong.')
      }
    },
  },
}
</script>
