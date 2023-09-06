import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import VueRouter from 'unplugin-vue-router/vite'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/front-list/',
  plugins: [
    VueRouter({
      routesFolder: './src/views',
    }),
    vue(),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
