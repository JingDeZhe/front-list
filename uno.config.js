import transformerCompileClass from '@unocss/transformer-compile-class'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  transformers: [transformerDirectives(), transformerCompileClass()],
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
