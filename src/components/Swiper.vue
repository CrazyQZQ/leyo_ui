<template>
	<van-swipe class="w-full rounded-md shadow-sm h-full" :autoplay="5000" indicator-color="#fff">
		<van-swipe-item v-for="(item, index) in list" :key="index">
<!--			<img :src="item.imgUrl" alt="" @click="goToUrL(item.url)" />-->
      <van-image fit="cover" position="left" class="h-full" :src="item.imgUrl" />
		</van-swipe-item>
	</van-swipe>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface SwiperItem {
	url: string
	imgUrl: string
}

export default defineComponent({
	name: 'Swiper',
	props: {
		list: Array as PropType<Array<SwiperItem>>
	},
	setup() {
		const goToUrL = (url: string) => {
			if (url != '') window.open(url)
		}
		return {
			goToUrL
		}
	}
})
</script>
