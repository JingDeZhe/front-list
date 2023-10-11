<script lang="ts" setup>
import { markRaw, onMounted, ref, unref } from 'vue'
import { VueFlow, useVueFlow, type Edge, type GraphEdge } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import NodeScript from './NodeScript.vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { IconInfoCircleFilled } from '@tabler/icons-vue'
import { v4 as uid } from 'uuid'
import { get as kyGet, set as kySet } from 'idb-keyval'
import ContextMenu from '@imengyu/vue3-context-menu'

import { definePage } from 'vue-router/auto'
definePage({
  name: '状态机图',
})

const flow = useVueFlow()

type FlowElement =
  | {
      id: string
      type: string
      position: { x: number; y: number }
      label?: string
      events?: { [k: string]: Function }
    }
  | { id: string; source: string; target: string }

const elements = ref<FlowElement[]>()
const refFlowCtn = ref<HTMLElement>()

const editorVis = ref(false)
const editorCode = ref('')
const editorLable = ref('')
const editorType = ref('')
const flowScript = ref('')

function addNodeScript(x = 10, y = 10) {
  flow.addNodes({
    id: uid(),
    type: 'script',
    position: { x, y },
    data: { label: '', script: '' },
  })
  saveFlow()
}

function deleteNode(nodeId: string) {
  flow.removeNodes(nodeId)
  saveFlow()
}

function deleteEdges(edges: GraphEdge[]) {
  flow.removeEdges(edges)
  saveFlow()
}

function openFlowScriptInput() {
  editorType.value = 'flow'
  editorCode.value = unref(flowScript)
  editorVis.value = true
}

function handleNodeConnect(connect: any) {
  flow.addEdges(connect)
  saveFlow()
}

let activeScriptNodeData: any
function openNodeScriptInput(data: any) {
  editorType.value = 'node'
  activeScriptNodeData = data
  editorCode.value = data.script
  editorLable.value = data.label
  editorVis.value = true
}
function closeScriptInput() {
  editorVis.value = false
}
function confirmScriptInput() {
  editorVis.value = false
  if (editorType.value === 'node') {
    activeScriptNodeData.script = unref(editorCode)
    activeScriptNodeData.label = unref(editorLable)
  } else {
    flowScript.value = unref(editorCode)
  }
  saveFlow()
}

const TMP_STORE_KEY = 'tmp-flow'
async function saveFlow() {
  const d = flow.toObject()
  await kySet(TMP_STORE_KEY, d)
}

async function loadFlow() {
  const d = await kyGet(TMP_STORE_KEY)
  flow.fromObject(d || [])
}

function showContextmenu(e: MouseEvent) {
  const { x, y, target } = e
  const { x: offX, y: offY } = refFlowCtn.value!.getBoundingClientRect()
  const { x: transX, y: transY, zoom } = flow.viewport.value
  const nodeId = getNodeId(target as HTMLElement)

  const menu = [
    {
      label: 'Add Node',
      onClick: () => addNodeScript((x - offX - transX) / zoom, (y - offY - transY) / zoom),
    },
  ]

  if (nodeId) {
    menu.push({
      label: 'Delete Node',
      onClick: () => deleteNode(nodeId),
    })
  }

  ContextMenu.showContextMenu({ x, y, items: menu })
}

function getNodeId(el: HTMLElement) {
  let t = el
  while (t && !t.hasAttribute('data-node-id')) {
    if (!t.parentElement) return
    t = t.parentElement
  }
  return t.dataset.nodeId
}

onMounted(loadFlow)
</script>

<template>
  <div class="app-ctn state-machine">
    <div class="h-full overflow-hidden flex flex-col">
      <div class="p-2" v-if="editorType === 'node'">
        <el-button @click="openFlowScriptInput">Edit Flow Context</el-button>
      </div>
      <div class="flex-1" ref="refFlowCtn" @contextmenu.prevent="showContextmenu">
        <VueFlow
          class="h-full"
          v-model="elements"
          @connect="handleNodeConnect"
          @node-drag-stop="saveFlow"
        >
          <template #node-script="{ id, data }">
            <NodeScript :id="id" :data="data" @click="openNodeScriptInput(data)" />
          </template>
        </VueFlow>
      </div>
    </div>

    <el-drawer
      v-model="editorVis"
      direction="rtl"
      size="1000px"
      class="editor-ctn"
      :show-close="false"
      :with-header="false"
      :close-on-click-modal="true"
      @closed="closeScriptInput"
    >
      <template #default>
        <div class="h-full overflow-hidden flex flex-col">
          <div class="p-2">
            <el-input class="dark-input" v-model="editorLable"></el-input>
          </div>
          <div class="func-wrap flex items-center">
            function&#40;
            <span>flow</span><span v-if="editorType === 'flow'">,&nbsp;exports</span>&#41; &#123;
            <el-popover width="260">
              <template #reference>
                <el-icon class="ml-auto"><IconInfoCircleFilled /></el-icon>
              </template>
              <div><span class="font-bold">ctx:</span> Project context</div>
              <div><span class="font-bold">flow:</span> Flow chart context</div>
              <div><span class="font-bold">exports:</span> Object to export</div>
            </el-popover>
          </div>
          <div class="flex-1 overflow-hidden">
            <codemirror
              v-model="editorCode"
              :style="{ height: '100%' }"
              placeholder="..."
              :autofocus="true"
              :indent-with-tab="true"
              :tab-size="2"
              :extensions="[javascript(), oneDark]"
            />
          </div>
          <div class="func-wrap">&#125;</div>
          <div class="p-2 mt-1 text-right">
            <el-button color="#3B4252" @click="editorVis = false">cancel</el-button>
            <el-button color="#81A1C1" type="primary" @click="confirmScriptInput"
              >confirm</el-button
            >
          </div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: 'firacode';
  src: url('/FiraCode-VF.woff2');
}

.state-machine {
  --c-box-border: #ccc;
  .node-box {
    border: 1px solid var(--c-box-border);
    --at-apply: w-[200px] text-center rounded overflow-hidden;
  }
  .node-page {
    border-left: 6px solid #f88f6f;
    .el-input__wrapper {
      border-radius: 0 !important;
    }
  }
  .node-script {
    --at-apply: h-[30px] flex items-center gap-1 justify-center bg-white;
    border-left: 6px solid #56a7ca;
  }
  .editor-ctn {
    .el-drawer__body {
      --at-apply: p-0 bg-[#282c34];
    }
    .cm-scroller {
      font-family: firacode, consolas, Courier, monospace;
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: #5d6675;
        border-radius: 3px;
      }
    }
    .func-wrap {
      font-family: firacode, consolas, Courier, monospace;
      --at-apply: p-2 text-gray-200;
      > span {
        --at-apply: text-[#e06c75];
      }
    }
  }
}
</style>
