<script lang="ts" setup>
import { TreeNode } from './utils/tree'

function build01(nums: number[], lo: number, hi: number) {
  if (lo > hi) return null
  let max = Number.MIN_SAFE_INTEGER
  let index = -1
  for (let i = lo; i <= hi; i++) {
    if (nums[i] > max) {
      max = nums[i]
      index = i
    }
  }
  const node = new TreeNode(max)
  node.left = build01(nums, lo, index - 1)
  node.right = build01(nums, index + 1, hi)

  return node
}

// console.log(build01([3, 2, 1, 6, 0, 5], 0, 5)?.toString())

function buildTree02(preorder: number[], inorder: number[]) {
  const valueIndex = new Map<number, number>()
  for (let i = 0, len = inorder.length; i < len; i++) {
    valueIndex.set(inorder[i], i)
  }

  function build02(
    preorder: number[],
    preStart: number,
    preEnd: number,
    inorder: number[],
    inStart: number,
    inEnd: number
  ) {
    const rootValue = inorder[inStart]
    const rootIndex = valueIndex.get(rootValue)
    const node = new TreeNode(rootValue)
  }
}
</script>

<template></template>

<style lang="scss"></style>
