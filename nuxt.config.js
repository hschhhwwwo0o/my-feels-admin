export default {
  ssr: false,
  head: {
    title: 'My Feels Admin Panel',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['ant-design-vue/dist/antd.css', '@/assets/css/index.css'],
  plugins: ['@/plugins/antd-ui', '@/plugins/feathers.js'],
  components: true,
  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/eslint-module'],
  modules: [],
  build: {},
}
