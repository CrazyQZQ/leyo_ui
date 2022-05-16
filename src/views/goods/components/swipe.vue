<template>
  <van-swipe class="w-full rounded-md shadow-sm" :autoplay="3000" indicator-color="#fff">
    <van-swipe-item v-for="(item, index) in list" :key="index">
      <img :src="item.imgUrl" alt="" @click="goToUrL(item.url)" />
    </van-swipe-item>
    <template #indicator="{ active }">
      <div class="custom-indicator">{{ active + 1 }}/{{list.length}}</div>
    </template>
  </van-swipe>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
	setup() {
		let list = [
			{
				imgUrl:
					'https://m.360buyimg.com/mobilecms/s720x720_jfs/t1/171006/32/1590/56923/5ff7d25cE9271e4f5/c70e1a1bc1f86324.jpg!q70.dpg.webp',
				url: 'https://m.360buyimg.com/mobilecms/s720x720_jfs/t1/171006/32/1590/56923/5ff7d25cE9271e4f5/c70e1a1bc1f86324.jpg!q70.dpg.webp'
			},
			{
				imgUrl:
					'https://m.360buyimg.com/mobilecms/s720x720_jfs/t1/161721/6/1620/65326/5ff7d25cEaea0abf4/b762cc62c1423801.jpg!q70.dpg.webp',
				url: 'https://m.360buyimg.com/mobilecms/s720x720_jfs/t1/161721/6/1620/65326/5ff7d25cEaea0abf4/b762cc62c1423801.jpg!q70.dpg.webp'
			}
		]
		const goToUrL = (url: string) => {
			if (url != '') window.open(url)
		}
		return {
			list,
			goToUrL
		}
	}
})
</script>
<style scoped>
.custom-indicator {
	position: absolute;
	right: 5px;
	bottom: 5px;
	padding: 2px 5px;
	font-size: 12px;
	background: rgba(0, 0, 0, 0.1);
}
</style>