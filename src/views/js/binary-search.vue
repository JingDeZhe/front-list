<script lang="ts" setup>
function dfs(nums: number[], start: number, end: number, target: number) {
  if (start > end) return -1
  const middle = start + ((end - start) >> 1)
  if (nums[middle] < target) {
    return dfs(nums, middle + 1, end, target)
  } else if (nums[middle] > target) {
    return dfs(nums, start, middle - 1, target)
  } else {
    return middle
  }
}

function binarySearch(nums: number[], target: number) {
  return dfs(nums, 0, nums.length - 1, target)
}

console.log(binarySearch([1, 4, 6, 8, 12, 90, 124], 12))
</script>

<template>
  <div></div>
</template>

<style lang="scss"></style>
