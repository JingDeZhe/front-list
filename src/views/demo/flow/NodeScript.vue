<script lang="ts" setup>
import { Handle, Position } from '@vue-flow/core'
import { computed, ref } from 'vue'

const props = defineProps<{
  data?: any
  id: string
}>()

const emit = defineEmits(['click'])

function toEditScript() {
  emit('click')
}

const hasCode = computed(() => !!props.data?.script)
</script>

<template>
  <div class="node-box node-script" :data-node-id="id">
    <el-icon
      color="#aaa"
      class="hover:text-orange"
      :class="{ 'text-orange': hasCode }"
      @click="toEditScript"
    >
      <i class="i-tabler-terminal"></i>
    </el-icon>
    <span class="italic text-gray-500"> click to edit </span>
  </div>

  <Handle type="source" :position="Position.Right" />
  <Handle type="target" :position="Position.Left" />
</template>

<style lang="scss" scoped></style>
