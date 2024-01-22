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
  const vecCenter = p.createVector(s / 2, s / 2)

  p.setup = () => {
    p.createCanvas(s, s)
    p.background('#ccc')
  }

  p.draw = () => {
    p.background('#ccc')

    const mouse = p.createVector(p.mouseX, p.mouseY)
    mouse.sub(vecCenter)
    p.noFill()
    p.strokeWeight(2)
    p.stroke('#C57E34')
    p.translate(s / 2, s / 2)
    p.line(0, 0, mouse.x, mouse.y)
    p.strokeWeight(1)
    p.stroke(150)
    p.rect(0, 0, mouse.x, mouse.y)
    p.text(mouse.mag().toFixed(1), mouse.x / 2, mouse.y / 2)
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
