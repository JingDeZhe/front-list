<script lang="ts" setup>
import ContextMenu from './contextmenu'
import { definePage } from 'vue-router/auto'

definePage({ name: '简单的右键菜单' })
const cmu = new ContextMenu()

function showCmu(e: MouseEvent) {
  cmu.show({
    x: e.x,
    y: e.y,
    menu: [
      { label: '🐕 Snooby', onClick: () => console.log('Snooby') },
      { label: '🥲 Charile Brown' },
      { type: 'divide' },
      { label: '🤠 Linus' },
    ],
  })
}
</script>

<template>
  <div class="app-ctn" @contextmenu.prevent="showCmu"></div>
</template>

<style lang="scss" scoped></style>
