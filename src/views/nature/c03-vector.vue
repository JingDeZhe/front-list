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

  class Ball {
    x = 0
    y = 0
    d = 6
    velocity = new p5.Vector(0, 0)

    constructor(config: BallConfig) {
      this.x = config.x
      this.y = config.y
      this.velocity = new p5.Vector(...config.velocity)
    }

    step() {
      this.checkCollision()
      this.x += this.velocity.x
      this.y += this.velocity.y
    }

    checkCollision() {
      if (this.x < 0 || this.x > s) {
        this.velocity.x *= -1
      }
      if (this.y < 0 || this.y > s) {
        this.velocity.y *= -1
      }
    }

    display() {
      this.step()
      p.fill('#303030')
      p.noStroke()
      p.circle(this.x, this.y, this.d)
    }
  }

  const ball = new Ball({ x: s / 2, y: s / 2, d: 6, velocity: [3, 5] })
  p.setup = () => {
    p.createCanvas(s, s)
    p.background('#ccc')
  }

  p.draw = () => {
    p.background('#ccc')
    ball.display()
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
