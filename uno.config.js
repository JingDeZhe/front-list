import { defineConfig, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [presetUno()],
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      primary: `var(--el-color-primary)`,
      info: `var(--el-color-info)`,
      success: `var(--el-color-success)`,
      warning: `var(--el-color-warning)`,
      danger: `var(--el-color-danger)`,
    },
  },
})
