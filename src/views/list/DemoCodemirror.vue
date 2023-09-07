<script lang="ts" setup>
import { onMounted, ref, shallowRef } from 'vue'
import { basicSetup, EditorView } from 'codemirror'
import { EditorState, Compartment } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import { cpp } from '@codemirror/lang-cpp'
import { tags } from '@lezer/highlight'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { codeJs, codeCpp } from './data/code-snippets'
import { toggleDark } from '@/util'

toggleDark(true)
const ctn = ref<HTMLElement>()
const view = shallowRef<EditorView>()

const langConfig = new Compartment()
const readonlyConfig = new Compartment()

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
        borderLeftColor: 'var(--nord1)',
      },
      '&.cm-focused .cm-selectionBackground, ::selection': {
        backgroundColor: 'var(--nord2)',
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
      { tag: tags.comment, color: 'var(--nord14)', fontStyle: 'italic' },
      { tag: tags.number, color: 'var(--nord15)' },
      { tag: tags.string, color: 'var(--nord14)' },
      { tag: tags.bool, color: 'var(--nord13)' },
      { tag: tags.variableName, color: 'var(--nord12)' },
    ])
  )

  const state = EditorState.create({
    doc: codeJs,
    extensions: [
      basicSetup,
      langConfig.of(javascript()),
      readonlyConfig.of(EditorState.readOnly.of(false)),
      themeNord,
      highlightNord,
    ],
  })

  view.value = new EditorView({
    state,
    parent: ctn.value!,
  })
})

let activeLang = 'js'
function toggleLanguage() {
  const v = view.value!
  activeLang = activeLang === 'js' ? 'cpp' : 'js'
  const isJs = activeLang === 'js'
  v.dispatch({
    changes: [
      {
        from: 0,
        to: v.state.doc.length,
        insert: isJs ? codeJs : codeCpp,
      },
    ],
    effects: langConfig.reconfigure(isJs ? javascript() : cpp()),
  })
}

let readonly = false
function toggleReadonly() {
  const v = view.value!
  readonly = !readonly
  v.dispatch({
    effects: readonlyConfig.reconfigure(EditorState.readOnly.of(readonly)),
  })
}
</script>

<template>
  <div class="app-ctn col-ctn dcm">
    <div class="p-2 flex items-center gap-2 justify-end">
      <el-button @click="toggleReadonly">Toggle Readonly</el-button>
      <el-button @click="toggleLanguage">Toggle Language</el-button>
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
