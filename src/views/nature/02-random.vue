<script lang="ts" setup>
import { ref } from 'vue'
import { useP5 } from './util'
import p5 from 'p5'
const ctn = ref()
useP5((p) => {
  const s = 500
  p.setup = () => {
    p.createCanvas(s, s)
    p.background(240)
  }

  let t1 = 0
  let t2 = 10000
  let last = [0, 0]
  p.draw = () => {
    p.stroke(100)
    p.strokeWeight(2)

    const x = p.map(p.noise(t1), 0, 1, 0, s)
    const y = p.map(p.noise(t2), 0, 1, 0, s)

    t1 += 0.01
    t2 += 0.01

    p.point(x, y)
  }
}, ctn)
</script>

<template>
  <div class="p5-ctn" ref="ctn"></div>
</template>

<style lang="scss"></style>
