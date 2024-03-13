<script lang="ts" setup></script>

<template>
  <div class="p-5">
    <div class="rect d1">ONE</div>
    <div class="rect d2">ONE</div>
    <div class="rect d3">ONE</div>
    <div class="rect d4">ONE</div>
    <div class="rect d5">ONE</div>
    <div class="rect d6">ONE</div>
    <div class="rect d7">ONE</div>
  </div>
</template>

<style lang="scss" scoped>
.rect {
  width: 200px;
  height: 50px;
  background-color: #ede3e7;
  margin-bottom: 10px;
}
.d1 {
  border-left: 10px solid #ed4845;
}
.d2 {
  box-shadow: -10px 0 0 #ed4845;
}
.d3 {
  box-shadow: inset 10px 0 0 #ed4845;
}
.d4 {
  position: relative;
  z-index: 1;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 10px;
    background-color: #ed4845;
    z-index: -1;
  }
}
.d5 {
  filter: drop-shadow(-10px 0 0 #ed4845);
}
.d6 {
  background-image: linear-gradient(90deg, #ed4845 0, #ed4845 10px, transparent 10px);
}
.d7 {
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #ed4845;
  &::-webkit-scrollbar {
    width: 190px;
    background-color: #ede3e7;
  }
}
</style>
