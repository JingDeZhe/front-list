<script lang="ts" setup>
/**最长交替数组 */
const tests = [
  [2, 3, 4, 3, 4],
  [4, 5, 6],
  [21, 9, 6],
  [7, 10, 5, 2, 11, 3, 9, 12, 9, 11],
]
function alternatingSubarray(arr: number[]): number {
  const len = arr.length
  let maxLen = -1
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[j] - arr[i] === (j - i) % 2) {
        maxLen = Math.max(maxLen, j - i + 1)
      } else {
        break
      }
    }
  }
  return maxLen
}

function alternatingSubarray2(arr: number[]): number {
  let maxLen = -1
  let anchor = 0
  for (let i = 1, len = arr.length; i < len; i++) {
    if (arr[i] - arr[anchor] === (i - anchor) % 2) {
      maxLen = Math.max(maxLen, i - anchor + 1)
    } else {
      if (arr[i] - arr[i - 1] === 1) {
        anchor = i - 1
        maxLen = Math.max(maxLen, 2)
      } else {
        anchor = i
      }
    }
  }
  return maxLen
}

tests.forEach((arr) => {
  console.log(alternatingSubarray(arr))
})
tests.forEach((arr) => {
  console.log(alternatingSubarray2(arr))
})
</script>

<template></template>

<style lang="scss"></style>
