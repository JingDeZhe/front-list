<script lang="ts" setup>
import p5 from 'p5'
import { onMounted, ref } from 'vue'
import { definePage } from 'vue-router/auto'
definePage({
  name: 'Vector 01',
})

const ctn = ref<HTMLElement>()

function sketch(p: p5) {
  const s = 300

  p.setup = () => {
    p.createCanvas(s, s)
    p.background('#ccc')
  }

  p.draw = () => {
    p.background('#ccc')
  }
}

onMounted(() => {
  new p5(sketch, ctn.value)
})
</script>

<template>
  <div class="canvas-ctn" ref="ctn"></div>
</template>

<style lang="scss"></style>
