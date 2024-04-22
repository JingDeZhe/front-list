<script lang="ts" setup>
import p5 from 'p5'
import { onMounted, ref } from 'vue'
import { last, random } from 'lodash-es'

const ctn = ref()
onMounted(() => {
  new p5((p: p5) => {
    const s = 500
    const s1 = 10
    const c1 = '#30161c'

    const randomTurn = () => {
      return p.createVector(random(s - s1 * 5), random(s - s1 * 5))
    }
    class Snake {
      turns: p5.Vector[] = []
      tract: p5.Vector
      direction = 0

      speed = 1

      constructor() {
        const head = randomTurn()
        this.tract = p5.Vector.add(head, p.createVector(0, 1))
        this.turns.push(head)
      }
      interact(key: string) {
        switch (key) {
          case 'w': {
            this.tract.add(0, -1)
            break
          }
          case 'd': {
            this.tract.add(1, 0)
            break
          }
          case 's': {
            this.tract.add(0, 1)
            break
          }
          case 'a': {
            this.tract.add(-1, 0)
            break
          }
        }
      }
      step() {
        if (this.turns.length === 1) {
        } else {
          const tail = last(this.turns)
        }
      }
      draw() {
        p.push()
        p.stroke(c1)
        p.fill(c1)
        for (let t of this.turns) {
          p.rect(t.x, t.y, s1, s1)
        }
        p.pop()
      }
    }

    let snake: Snake

    p.setup = () => {
      p.createCanvas(s, s)
      snake = new Snake()
    }

    p.draw = () => {
      p.background(230)
      snake.draw()
    }

    p.keyPressed = (e: KeyboardEvent) => {
      snake.interact(e.key)
    }
  }, ctn.value)
})
</script>

<template>
  <div class="p5-ctn" ref="ctn"></div>
</template>

<style lang="scss"></style>
