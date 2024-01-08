<script setup>
import { bignumber, add, number } from 'mathjs'

function bAdd(nums) {
  let t = bignumber(0)
  for (let n of nums) {
    t = add(t, bignumber(n))
  }
  return number(t)
}

console.log(bAdd([36.7568, 5.4054, 4.8649, 43.2432, 9.7297]))
</script>

<template>
  <div></div>
</template>

<style lang="scss"></style>
