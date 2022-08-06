<template>
  <div class="flex items-center p-1">
    <div class="inline-block bg-purple-500 w-1 h-5  mx-2"></div>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'lineblock',
	setup() {}
})
</script>
