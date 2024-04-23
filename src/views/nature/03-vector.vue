<script lang="ts" setup>
import { ref } from 'vue'
import { useP5 } from './util'
import p5 from 'p5'
import chroma from 'chroma-js'
const ctn = ref()
useP5((p) => {
  const s = 500

  class Mover {
    pos: p5.Vector
    acceleration = p.createVector(0, 0)
    velocity = p.createVector(0, 0)
    topV = 10
    s = 10
    color1: string
    color2: string

    constructor() {
      const t = chroma.random()
      this.color1 = t.hex()
      this.color2 = t.darken(1.2).hex()
      this.pos = p.createVector(p.random(s), p.random(s))
    }

    update() {
      const vMouse = p.createVector(p.mouseX, p.mouseY)
      const dir = p5.Vector.sub(vMouse, this.pos)
      dir.normalize()
      dir.mult(0.5)

      this.acceleration = dir
      this.velocity.add(this.acceleration).limit(this.topV)
      this.pos.add(this.velocity)
    }

    display() {
      p.stroke(this.color2)
      p.fill(this.color1)
      p.circle(this.pos.x, this.pos.y, this.s)
    }

    checkEdge() {
      if (this.pos.x > s) this.pos.x = 0
      if (this.pos.x < 0) this.pos.x = s
      if (this.pos.y > s) this.pos.y = 0
      if (this.pos.y < 0) this.pos.y = s
    }
  }

  let movers: Mover[] = []
  p.setup = () => {
    p.createCanvas(s, s)
    for (let i = 0; i < 10; i++) {
      movers.push(new Mover())
    }
  }

  p.draw = () => {
    p.background(230)
    for (let mover of movers) {
      mover.update()
      mover.checkEdge()
      mover.display()
    }
  }
}, ctn)
</script>

<template>
  <div class="p5-ctn" ref="ctn"></div>
</template>

<style lang="scss"></style>
