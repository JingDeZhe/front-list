<script lang="ts" setup>
import { SelectionArea, type SelectionEvent } from '@viselect/vue'
import { computed, reactive, ref } from 'vue'

const config = ref({
  row: 6,
  col: 10,
})

const seats = computed(() => {
  const { row, col } = config.value
  const t = []
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      t.push({
        index: i * col + j,
      })
    }
  }
  return t
})

const refSelection = ref()
const selected = reactive<Set<number>>(new Set())

const extractIds = (els: Element[]): number[] => {
  return els
    .map((v) => v.getAttribute('data-key'))
    .filter(Boolean)
    .map(Number)
}

const onStart = ({ event, selection }: SelectionEvent) => {
  if (!event?.ctrlKey && !event?.metaKey) {
    selection.clearSelection()
    selected.clear()
  }
}

const onMove = ({
  store: {
    changed: { added, removed },
  },
}: SelectionEvent) => {
  extractIds(added).forEach((id) => selected.add(id))
  extractIds(removed).forEach((id) => selected.delete(id))
}

function selectAll() {
  const selection = refSelection.value?.selection as SelectionEvent['selection']
  if (!selection) return
  selection.select([...refSelection.value.$el.children])
}

function selectClear() {
  const selection = refSelection.value?.selection as SelectionEvent['selection']
  if (!selection) return
  selection.clearSelection()
  selected.clear()
}
</script>

<template>
  <div class="theme-dark app-ctn all-center">
    <div class="flex gap-2 mb-5">
      <el-button @click="selectAll">Select All</el-button>
      <el-button @click="selectClear">Clear</el-button>
    </div>
    <SelectionArea
      class="seat-list"
      :options="{ selectables: '.seat-item' }"
      :on-move="onMove"
      :on-start="onStart"
      :style="{ gridTemplateColumns: `repeat(${config.col}, 1fr)` }"
      ref="refSelection"
    >
      <div
        class="seat-item"
        v-for="v in seats"
        :key="v.index"
        :data-key="v.index"
        :class="{ selected: selected.has(v.index) }"
      ></div>
    </SelectionArea>
  </div>
</template>

<style lang="scss">
.seat-list {
  user-select: none;
  --at-apply: grid grid-content-start gap-2 w-max h-max;
}
.seat-item {
  border: 1px solid #aaa;
  --at-apply: w-[30px] h-[30px] rounded;
  &:hover {
    --at-apply: border-orange;
  }
  &.selected {
    --at-apply: bg-orange border-orange;
  }
}
</style>
