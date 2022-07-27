<template>
	<div>
		<!-- <div class="w-full h-32 rounded-md bg-white wrapper whitespace-nowrap relative overflow-hidden">
			<div class="scroll-content inline-block pt-1">
				<div class="scroll-item inline-block" v-for="(item, index) in list" :key="index">
					<div class="flex flex-col justify-center items-center mx-3">
						<img
							:src="item.imageUrls?item.imageUrls[0]:''"
							:alt="item.name"
							class="w-16 h-16"
							@click="toCatory(item)"
						/>
						<p class="text-xs pt-1 font-light text-gray-700 dark:text-gray-50">{{ item.name }}</p>
					</div>
				</div>
			</div>
		</div>-->
		<van-grid :border="false" :column-num="4" class="w-full h-42 rounded-md bg-white shadow-sm p-4">
			<van-grid-item v-for="(item, index) in list" :key="index" v-show="item.imageUrls && item.imageUrls[0]">
				<van-image class="w-14 h-14 m-0.5" :src="item.imageUrls?item.imageUrls[0]:''" />
				<p class="text-xs pt-2 font-light text-gray-700 dark:text-gray-50">{{item.name}}</p>
			</van-grid-item>
			<van-grid-item>
				<van-icon name="qr" class="w-14 h-14 m-0.5" size="63" />
				<p class="text-xs pt-2 font-light text-gray-700 dark:text-gray-50">更多</p>
			</van-grid-item>
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
