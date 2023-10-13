<script lang="ts" setup>
import { fkSentence, fkWords, toggleDark } from '@/util'
toggleDark(false)
</script>

<template>
  <div class="app-ctn col-ctn">
    <div class="v-center gap-1">
      <div class="text-lg">
        <span>{{ fkWords(2, true) }}</span>
      </div>
    </div>
    <div class="col-ctn_body"></div>
  </div>
</template>

<style lang="scss"></style>
