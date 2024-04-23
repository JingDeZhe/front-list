<script lang="ts" setup>
import { ref } from 'vue'
import { useP5 } from './util'
import p5 from 'p5'
const ctn = ref()
useP5((p) => {
  const s = 500

  class Ball {
    pos: p5.Vector
    mass = p.random(6, 16)
    velocity = p.createVector()
    acceleration = p.createVector()

    constructor() {
      this.pos = p.createVector(p.random(s), p.random(s))
    }

    applyForce(force: p5.Vector) {
      const f = p5.Vector.div(force, this.mass)
      this.acceleration.add(f)
    }

    update() {
      this.velocity.add(this.acceleration)
      this.pos.add(this.velocity)
      this.acceleration.mult(0)
    }

    checkEdge() {
      if (this.pos.y > s) {
        this.velocity.y *= -1
        this.pos.y = s - this.mass / 2
      }
      if (this.pos.x > s) {
        this.velocity.x *= -1
        this.pos.x = s - this.mass / 2
      }
    }

    display() {
      p.stroke(30)
      p.fill(50)
      p.circle(this.pos.x, this.pos.y, this.mass)
    }
  }

  let balls: Ball[] = []
  p.setup = () => {
    p.createCanvas(s, s)
    for (let i = 0; i < 2; i++) {
      balls.push(new Ball())
    }
  }

  const g = p.createVector(0, 10)
  const wind = p.createVector(3, 0)

  p.draw = () => {
    p.background(230)
    for (let ball of balls) {
      const fri = ball.velocity.copy()
      fri.normalize()
      fri.mult(-0.5)
      ball.applyForce(fri)
      ball.applyForce(g)
      ball.applyForce(wind)
      ball.update()
      ball.checkEdge()
      ball.display()
    }
  }
}, ctn)
</script>

<template>
  <div class="p5-ctn" ref="ctn"></div>
</template>

<style lang="scss"></style>
