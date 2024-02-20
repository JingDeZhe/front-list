<script lang="ts" setup>
function merge(nums1: number[], m: number, nums2: number[], n: number) {
  let cur
  let tail = m + n - 1
  for (let i = m - 1, j = n - 1; i >= 0 || j >= 0; ) {
    if (i === -1) {
      cur = nums2[j--]
    } else if (j === -1) {
      cur = nums1[i--]
    } else if (nums1[i] > nums2[j]) {
      cur = nums1[i--]
    } else {
      cur = nums2[j--]
    }
    nums1[tail--] = cur
  }
}
</script>

<template></template>

<style lang="scss"></style>
