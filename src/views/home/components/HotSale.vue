<!--  -->
<template>
  <line-bLock>热销商品</line-bLock>
  <!-- <van-grid :column-num="2" :gutter="10" square>
    <van-grid-item v-for="item in dataSource" :key="item.label" class="p-0">
      <div class="h-4/6 w-full justify-start">
        <img class="h-full w-full" :src="item.img" />
      </div>
      <span class="w-full text-center p-1 text-xs truncate">{{item.label}}</span>
    </van-grid-item>
  </van-grid> -->
	<div class="rounded-lg bg-white">
  <div class="grid grid-cols-2 gap-2 p-2">
    <div v-for="item in dataSource" :key="item.label" class="h-52 w-full bg-white" @click="$router.push('/goods')">
      <div class="h-36">
        <img class="h-full w-full" :src="item.img" />
      </div>
      <p class="w-full  px-1 py-0.5 text-xs truncate text-gray-500 font-sans">{{item.label}}</p>
      <p class="w-full  px-1 py-0.5 text-xs truncate text-gray-500 font-sans">{{item.store}}</p>
      <p class="w-full  px-1 py-0.5 text-xs truncate font-sans text-red-500">￥{{item.price}}</p>
    </div>
  </div>
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'
import LineBLock from '@src/components/lineblock.vue'
export default defineComponent({
	components: {
		'line-bLock': LineBLock
	},
	setup() {
		let dataSource = ref()
		dataSource.value = [
			{
				img: 'https://img20.360buyimg.com/mobilecms/s372x372_jfs/t1/121188/38/12201/129198/5f589409E522750a3/9ad66c3f658aa6ac.jpg!q70.dpg.webp',
				label: '香水座',
        store:'优衣库器件官方店',
        price:'2800'
			},
			{
				img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/180517/5/6817/74656/60b4d12aE8a86a8db/969a417947e76975.jpg!q70.dpg.webp',
				label: '名创优品（MINISO）黑色可口可乐杯子850ml 吸管杯保冷杯保温杯不锈钢水杯',
        store:'优衣库器件官方店',
        price:'2800'
			},
			{
				img: 'https://img20.360buyimg.com/mobilecms/s372x372_jfs/t1/121188/38/12201/129198/5f589409E522750a3/9ad66c3f658aa6ac.jpg!q70.dpg.webp',
				label: '香水座',
        store:'优衣库器件官方店',
        price:'2800'
			},
			{
				img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/180517/5/6817/74656/60b4d12aE8a86a8db/969a417947e76975.jpg!q70.dpg.webp',
				label: '名创优品（MINISO）黑色可口可乐杯子850ml 吸管杯保冷杯保温杯不锈钢水杯',
        store:'优衣库器件官方店',
        price:'2800'
			},
			{
				img: 'https://img20.360buyimg.com/mobilecms/s372x372_jfs/t1/121188/38/12201/129198/5f589409E522750a3/9ad66c3f658aa6ac.jpg!q70.dpg.webp',
				label: '香水座',
        store:'优衣库器件官方店',
        price:'2800'
			},
			{
				img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/180517/5/6817/74656/60b4d12aE8a86a8db/969a417947e76975.jpg!q70.dpg.webp',
				label: '名创优品（MINISO）黑色可口可乐杯子850ml 吸管杯保冷杯保温杯不锈钢水杯',
        store:'优衣库器件官方店',
        price:'2800'
			},
			{
				img: 'https://img20.360buyimg.com/mobilecms/s372x372_jfs/t1/121188/38/12201/129198/5f589409E522750a3/9ad66c3f658aa6ac.jpg!q70.dpg.webp',
				label: '香水座',
        store:'优衣库器件官方店',
        price:'2800'
			},
			{
				img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/180517/5/6817/74656/60b4d12aE8a86a8db/969a417947e76975.jpg!q70.dpg.webp',
				label: '名创优品（MINISO）黑色可口可乐杯子850ml 吸管杯保冷杯保温杯不锈钢水杯',
        store:'优衣库器件官方店',
        price:'2800'
			},
			{
				img: 'https://img20.360buyimg.com/mobilecms/s372x372_jfs/t1/121188/38/12201/129198/5f589409E522750a3/9ad66c3f658aa6ac.jpg!q70.dpg.webp',
				label: '香水座',
        store:'优衣库器件官方店',
        price:'2800'
			},
			{
				img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/180517/5/6817/74656/60b4d12aE8a86a8db/969a417947e76975.jpg!q70.dpg.webp',
				label: '名创优品（MINISO）黑色可口可乐杯子850ml 吸管杯保冷杯保温杯不锈钢水杯',
        store:'优衣库器件官方店',
        price:'2800'
			},
			{
				img: 'https://img20.360buyimg.com/mobilecms/s372x372_jfs/t1/121188/38/12201/129198/5f589409E522750a3/9ad66c3f658aa6ac.jpg!q70.dpg.webp',
				label: '香水座',
        store:'优衣库器件官方店',
        price:'2800'
			},
			{
				img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/180517/5/6817/74656/60b4d12aE8a86a8db/969a417947e76975.jpg!q70.dpg.webp',
				label: '名创优品（MINISO）黑色可口可乐杯子850ml 吸管杯保冷杯保温杯不锈钢水杯',
        store:'优衣库器件官方店',
        price:'2800'
			},
			{
				img: 'https://img20.360buyimg.com/mobilecms/s372x372_jfs/t1/121188/38/12201/129198/5f589409E522750a3/9ad66c3f658aa6ac.jpg!q70.dpg.webp',
				label: '香水座',
        store:'优衣库器件官方店',
        price:'2800'
			},
			{
				img: 'https://img12.360buyimg.com/mobilecms/s372x372_jfs/t1/180517/5/6817/74656/60b4d12aE8a86a8db/969a417947e76975.jpg!q70.dpg.webp',
				label: '名创优品（MINISO）黑色可口可乐杯子850ml 吸管杯保冷杯保温杯不锈钢水杯',
        store:'优衣库器件官方店',
        price:'2800'
			}
		]
		return {
			dataSource
		}
	}
})
</script>