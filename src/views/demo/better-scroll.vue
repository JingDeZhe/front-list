<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { toggleDark } from '@/util'
import BetterScroll from 'better-scroll'

import { definePage } from 'vue-router/auto'
definePage({
  name: 'Better Scroll',
})

toggleDark(true)

const ctn = ref<HTMLElement>()
onMounted(() => {
  new BetterScroll(ctn.value!, {
    movable: true,
    zoom: true,
  })
})
</script>

<template>
  <div class="app-ctn all-center theme-dark">
    <div ref="ctn" class="w-[50vw] h-[50vh] overflow-hidden">
      <div>
        <div v-for="v in 50" class="h-[30px] rounded mb-2 bg-orange-400 text-white"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
