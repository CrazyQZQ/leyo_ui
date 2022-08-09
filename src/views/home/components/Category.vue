<template>
	<div>
		<van-grid :border="false" :column-num="4" class="w-full h-42 rounded-md bg-white shadow-sm p-2 mt-2">
			<van-grid-item v-for="(item, index) in list" :key="index" v-show="item.imageUrls && item.imageUrls[0]">
				<van-image class="w-14 h-14 m-0.5" :src="item.imageUrls?item.imageUrls[0]:''" />
				<p class="text-xs pt-2 font-light text-gray-700 dark:text-gray-50">{{item.name}}</p>
			</van-grid-item>
			<!-- <van-grid-item>
				<van-icon name="qr" class="w-14 h-14 m-0.5" size="63" />
				<p class="text-xs pt-2 font-light text-gray-700 dark:text-gray-50">更多</p>
			</van-grid-item> -->
		</van-grid>
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
