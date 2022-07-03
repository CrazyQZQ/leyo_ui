<template>
  <div class="w-full h-42 mt-3 rounded-md bg-white shadow-sm grid grid-cols-4 gap-x-4 gap-y-6 p-4">
    <!-- {{list.length}} -->
    <div v-for="(item, index) in list" :key="index" class="text-center cursor-pointer">
      <img :src="item.imageUrls?item.imageUrls[0]:''" :alt="item.name" class="w-16 h-16" @click="toSearch(item)" />
      <p class="text-xs pt-2 font-light text-gray-700 dark:text-gray-50">{{ item.name }}</p>
    </div>
    <div class="text-center cursor-pointer">
      <van-icon name="qr" class="w-16 h-16 m-0.5" size="48" />
      <p class="text-xs pt-2 font-light text-gray-700 dark:text-gray-50">更多</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from 'vue'
import { ProductType } from '@src/models/product'

export default defineComponent({
	name: 'Category',
	props: {
		list: Array as PropType<ProductType[]>
	},
	setup(props) {
		const toSearch = (type: ProductType) => {
			console.log(type.name)
		}
		return {
			toSearch
		}
	}
})
</script>
