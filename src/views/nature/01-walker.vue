<script lang="ts" setup>
import { ref } from 'vue'
import { useP5 } from './util'
const ctn = ref()
useP5((p) => {
  const s = 500
  p.setup = () => {
    p.createCanvas(s, s)
  }

  p.draw = () => {
    p.background(230)
  }
}, ctn)
</script>

<template>
  <div class="p5-ctn" ref="ctn"></div>
</template>

<style lang="scss"></style>
