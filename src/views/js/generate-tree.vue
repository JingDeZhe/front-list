<script lang="ts" setup>
import { TreeNode } from './utils/tree'

function generateTree(preorder: number[], inorder: number[]) {
  const inorderMap = new Map<number, number>()
  for (let i = 0, len = inorder.length; i < len; i++) {
    inorderMap.set(inorder[i], i)
  }

  return dfs(preorder, inorderMap, 0, 0, inorder.length - 1)
}

function dfs(preorder: number[], inorderMap: Map<number, number>, i: number, l: number, r: number) {
  if (r - l < 0) return null
  const root = new TreeNode(preorder[i])
  const m = inorderMap.get(preorder[i])

  root.left = dfs(preorder, inorderMap, i + 1, l, m - 1)
  root.right = dfs(preorder, inorderMap, i + m - l + 1, m + 1, r)

  return root
}

console.log(generateTree([3, 9, 2, 1, 7], [9, 3, 1, 2, 7]))
</script>

<template>
  <div></div>
</template>

<style lang="scss"></style>
