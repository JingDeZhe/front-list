<script lang="ts" setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { routes } from 'vue-router/auto/routes'
</script>

<template>
  <div class="flex items-stretch">
    <div class="w-[300px]">
      <el-menu>
        <el-sub-menu></el-sub-menu>
      </el-menu>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss"></style>
