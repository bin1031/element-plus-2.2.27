<template>
  <el-button
    v-for="i in 3"
    :key="i"
    @mouseover="(e) => (buttonRef = e.currentTarget)"
    @click="visible = !visible"
  >
    Click to open tooltip
  </el-button>

  <el-tooltip
    ref="tooltipRef"
    :visible="visible"
    :popper-options="{
      modifiers: [
        {
          name: 'computeStyles',
          options: {
            adaptive: false,
            enabled: false,
          },
        },
      ],
    }"
    :virtual-ref="buttonRef"
    virtual-triggering
    popper-class="singleton-tooltip"
  >
    <template #content> Some content </template>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const buttonRef = ref()
const tooltipRef = ref()
const visible = ref(false)
</script>
