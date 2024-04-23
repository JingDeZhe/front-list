<script lang="ts" setup>
import { ref } from 'vue'
import { useP5 } from './util'
import p5 from 'p5'
const ctn = ref()
useP5((p) => {
  const s = 500
  const wh = 500 / 3

  class Mover {
    pos = p.createVector(p.random(s), 10)
    v = p.createVector()
    a = p.createVector()
    m = p.random(10, 20)

    constructor() {}

    applyForce(f: p5.Vector) {
      const t = p5.Vector.div(f, this.m)
      //@ts-ignore
      this.a.add(t)
    }
    update() {
      this.v.add(this.a)
      this.pos.add(this.v)
      this.a.mult(0)
    }
    checkEdge() {
      if (this.pos.y > s) {
        this.v.y *= -1
        this.pos.y = s - this.m
      }
    }
    display() {
      p.fill(60)
      p.stroke(30)
      p.circle(this.pos.x, this.pos.y, this.m * 2)
    }
  }

  const ms: Mover[] = []
  p.setup = () => {
    p.createCanvas(s, s)
    for (let i = 0; i < 10; i++) {
      ms.push(new Mover())
    }
  }

  const g = p.createVector(0, 1)
  const wc = 0.5
  p.draw = () => {
    p.background(230)
    p.noStroke()
    p.fill(120)
    p.rect(0, s - wh, s, wh)

    for (let m of ms) {
      if (m.pos.y > s - wh) {
        const ma = m.v
          .copy()
          .normalize()
          .mult(-wc * p.sq(m.v.mag()))
        m.applyForce(ma)
      }
      m.applyForce(p5.Vector.mult(g, m.m))
      m.update()
      m.checkEdge()
      m.display()
    }
  }
}, ctn)
</script>

<template>
  <div class="p5-ctn" ref="ctn"></div>
</template>

<style lang="scss"></style>
