import transformerCompileClass from '@unocss/transformer-compile-class'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
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
  safelist: getSafeList(),
})

function getSafeList() {
  return [
    'i-solar-password-minimalistic-input-linear',
    'i-solar-list-up-minimalistic-broken',
    'i-solar-check-square-linear',
    'i-tabler-circuit-switch-open',
  ]
}
