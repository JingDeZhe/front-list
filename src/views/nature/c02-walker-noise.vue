<script lang="ts" setup>
import p5 from 'p5'
import { onMounted, ref } from 'vue'
import { definePage } from 'vue-router/auto'
definePage({
  name: 'Randow Walker With Noise',
})

const ctn = ref<HTMLElement>()

function sketch(p: p5) {
  class Walker {
    x = 0
    y = 0
    fill = '#303030'
    d = 2
    stepL = 2
    config: WalkerConfig

    constructor(config: WalkerConfig) {
      this.config = config
      this.reset()
    }

    reset() {
      this.x = this.config.x || 0
      this.y = this.config.y || 0
    }

    step(i: number) {
      this.x += p.map(p.noise(i), 0, 1, -this.stepL, this.stepL)
      this.y += p.map(p.noise(i + 10000), 0, 1, -this.stepL, this.stepL)
    }

    display(i: number) {
      p.fill('#303030')
      p.noStroke()
      this.step(i)
      p.circle(this.x, this.y, this.d)
    }
  }

  const s = 300

  const walker = new Walker({ x: s / 2, y: s / 2 })
  p.setup = () => {
    const refreshBtn = p.createButton('refresh')
    refreshBtn.mouseClicked(() => {
      // p.background('#ccc')
      walker.reset()
    })

    p.background('#ccc')
    p.createCanvas(s, s)
  }

  p.draw = () => {
    walker.display(p.frameCount)
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
