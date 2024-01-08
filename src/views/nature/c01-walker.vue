<script lang="ts" setup>
import p5 from 'p5'
import { onMounted, ref } from 'vue'
import { definePage } from 'vue-router/auto'
definePage({
  name: 'Randow Walker',
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

    step() {
      this.x += p.random(-this.stepL, this.stepL)
      this.y += p.random(-this.stepL, this.stepL)
    }

    display(cnt = 1) {
      p.fill('#303030')
      p.noStroke()
      for (let i = 0; i < cnt; i++) {
        this.step()
        p.circle(this.x, this.y, this.d)
      }
    }
  }

  const s = 300

  const walker = new Walker({ x: s / 2, y: s / 2 })
  p.setup = () => {
    const refreshBtn = p.createButton('refresh')
    refreshBtn.mouseClicked(() => {
      p.draw()
    })

    p.background('#ccc')
    p.createCanvas(s, s)
    p.noLoop()
  }

  p.draw = () => {
    p.background('#ccc')
    walker.reset()
    walker.display(10000)
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
