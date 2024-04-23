import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { UserConfigExport, ConfigEnv } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { createHtmlPlugin } from 'vite-plugin-html'

const genScripts = (list: string[]) => {
  return list.map((v) => `<script src="${v}"></script>`).join('')
}
// https://vitejs.dev/config/
export default (cfg: ConfigEnv): UserConfigExport => {
  const isProd = process.env.NODE_ENV === 'production'
  return {
    server: { port: 3085 },
    base: '/front-list/',
    plugins: [
      VueRouter({
        routesFolder: './src/views',
      }),
      vue(),
      UnoCSS(),
      createHtmlPlugin({
        inject: {
          data: {
            cdnScript: isProd
              ? genScripts([
                  'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.24/vue.global.prod.min.js',
                  'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.2/p5.min.js',
                  // 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js',
                  'https://cdnjs.cloudflare.com/ajax/libs/element-plus/2.7.1/index.full.min.js',
                  'https://cdnjs.cloudflare.com/ajax/libs/ag-grid/31.2.1/ag-grid-community.min.js',
                  'https://cdnjs.cloudflare.com/ajax/libs/mathjs/12.4.1/math.js',
                  'https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.8.1/rxjs.umd.min.js',
                  'https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js',
                ])
              : '',
          },
        },
      }),
      visualizer({
        open: false,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        external: ['vue', 'p5', 'element-plus', 'ag-grid-community', 'mathjs', 'rxjs', 'numeral'],
        output: {
          format: 'iife',
          globals: {
            vue: 'Vue',
            p5: 'p5',
            // codemirror: 'CodeMirror',
            'element-plus': 'ElementPlus',
            'ag-grid-community': 'agGrid',
            mathjs: 'math',
            rxjs: 'rxjs',
            numeral: 'numeral',
          },
        },
      },
    },
  }
}
