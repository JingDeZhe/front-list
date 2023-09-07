<script lang="ts" setup>
import { useDark } from '@vueuse/core'
import { onMounted, ref, shallowRef } from 'vue'
import { basicSetup, EditorView } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import { tags } from '@lezer/highlight'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'

const dark = useDark()
const ctn = ref<HTMLElement>()
const view = shallowRef<EditorView>()

onMounted(() => {
  const themeNord = EditorView.theme(
    {
      '&': {
        color: 'var(--nord6)',
        backgroundColor: 'var(--nord0)',
        fontSize: '1rem',
      },
      '.cm-content': {
        caretColor: 'var(--nord6)',
        fontFamily: `'Sarasa Mono SC', 'Courier New', Courier, monospace`,
      },
      '&.cm-focused .cm-cursor': {
        borderLeftColor: 'var(--nord0)',
      },
      '&.cm-focused .cm-selectionBackground, ::selection': {
        backgroundColor: 'var(--nord-2)',
      },
      '.cm-gutters': {
        backgroundColor: 'var(--nord1)',
        color: 'var(--nord4)',
        border: 'none',
      },
    },
    { dark: true }
  )

  const highlightNord = syntaxHighlighting(
    HighlightStyle.define([
      { tag: tags.keyword, color: 'var(--nord9)' },
      { tag: tags.comment, color: 'var(--nord10)', fontStyle: 'italic' },
      { tag: tags.number, color: 'var(--nord15)' },
      { tag: tags.string, color: 'var(--nord14)' },
    ])
  )

  const state = EditorState.create({
    doc: `/* young and beautiful */\nconst a = 100\nconst b = 'snooby'`,
    extensions: [basicSetup, javascript(), themeNord, highlightNord],
  })

  view.value = new EditorView({
    state,
    parent: ctn.value!,
  })
})
</script>

<template>
  <div class="app-ctn col-ctn dcm">
    <div class="text-right p-2">
      <el-switch v-model="dark"></el-switch>
    </div>
    <div class="col-ctn_body" ref="ctn"></div>
  </div>
</template>

<style src="../../assets/nord.css"></style>
<style lang="scss">
.dcm {
  .cm-editor {
    --at-apply: h-full;
  }
}
</style>
