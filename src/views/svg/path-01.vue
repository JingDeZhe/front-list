<script lang="ts" setup></script>

<template>
  <div class="p-3">
    <p>svg path</p>
    <svg viewBox="0 0 100 100" width="100" height="100" class="svg">
      <path
        stroke="#303030"
        fill="#303030"
        stroke-width="5"
        d="M20,50a15,15 0 0,1 30,0 a15,15 0 0,1 -30,0ZM55,20V80"
      ></path>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.svg {
  border: 1px solid #aaa;
}
</style>
