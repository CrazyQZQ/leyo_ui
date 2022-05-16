<template>
  <div class="w-full h-42 mt-3 rounded-md bg-white shadow-sm grid grid-cols-4 gap-x-4 gap-y-6 p-4">
    <!-- {{list.length}} -->
    <div v-for="(item, index) in list" :key="index" class="text-center cursor-pointer">
      <img :src="item.icon" :alt="item.name" class="w-16 h-16" @click="toSearch(item.name)" />
      <p class="text-xs pt-2 font-light text-gray-700 dark:text-gray-50">{{ item.name }}</p>
    </div>
    <div class="text-center cursor-pointer">
      <van-icon name="qr" class="w-16 h-16 m-0.5" size="48" />
      <p class="text-xs pt-2 font-light text-gray-700 dark:text-gray-50">更多</p>
    </div>
  </div>
</template>

<script lang="ts">
import { NameWithIcon } from '@src/store/home'
import { defineComponent, PropType, toRef } from 'vue'

export default defineComponent({
	name: 'Category',
	props: {
		list: Array as PropType<Array<NameWithIcon>>
	},
	setup(props) {
		let list = toRef(props, 'list')
		console.log(list.value)
		list.value?.forEach((item) => {
			console.log(item.name)
		})
		const toSearch = (keyword: string) => {
			console.log(keyword)
		}
		return {
			toSearch
		}
	}
})
</script>
