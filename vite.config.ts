import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
// import { cdn } from './build/cdn'

const root: string = process.cwd()
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_CDN } = loadEnv(mode, root)
  return {
    base: '/front-list/',
    plugins: [
      VueRouter({
        routesFolder: './src/views',
      }),
      vue(),
      UnoCSS(),
      // VITE_CDN ? cdn : null,
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
}
