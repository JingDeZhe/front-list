<script setup>
import { Observable, fromEvent, scan, throttleTime } from 'rxjs'
const observable = new Observable((subscriber) => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  setTimeout(() => {
    subscriber.next(4)
  }, 1000)
})

const a = observable.subscribe({
  next(v) {
    console.log(v)
  },
  error(e) {
    console.log(e)
  },
  complete() {
    console.log('complete')
  },
})
</script>

<template>
  <div class="p-2">D01</div>
</template>

<style lang="scss"></style>
