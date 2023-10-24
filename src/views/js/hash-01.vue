<script lang="ts" setup>
class Pair {
  public key: number
  public value: string

  constructor(key: number, value: string) {
    this.key = key
    this.value = value
  }
}

class ArrayHashMap {
  private readonly buckets: (Pair | null)[]

  constructor() {
    this.buckets = new Array(100).fill(null)
  }

  private hashFunc(key: number) {
    return key % 100
  }

  public get(key: number): string | null {}
}
</script>

<template>
  <div></div>
</template>

<style lang="scss"></style>
