<!--  -->
<template>
  <line-bLock>热销商品</line-bLock>
	<div class="rounded-lg bg-white">
  <div class="grid grid-cols-2 gap-2 p-2">
    <div v-for="(item) in products" :key="item.id" class="h-53 w-full bg-white" @click="$router.push('/goodsDetail?id='+item.productId)">
      <div class="h-36">
        <img class="h-full w-full" :src="item.imageUrl?item.imageUrl:''" />
      </div>
      <p class="w-full  px-1 py-0.5 text-xs truncate text-gray-500 font-sans">{{item.productName}}</p>
      <p class="w-full  px-1 py-0.5 text-xs truncate text-gray-500 font-sans">
        <van-tag color="#ffe1e1" class="mr-1" text-color="#ad0000" v-for="(attribute,index) in item.skuAttributes" :key="index">{{attribute.value}}</van-tag>
      </p>
      <p class="w-full  px-1 py-0.5 text-xs truncate text-gray-500 font-sans">销量：{{item.sales}}</p>
      <p class="w-full  px-1 py-0.5 text-xs truncate font-sans text-red-500">￥{{item.price}}</p>
    </div>
  </div>
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref ,Ref} from 'vue'
import LineBLock from '@src/components/lineblock.vue'
import { hotSales } from "@src/api/order";
import { Sku } from "@src/models";
export default defineComponent({
	components: {
		'line-bLock': LineBLock
	},
	setup() {
		let products: Ref<Product[]> = ref([])
		let pageNum = 1;
		let pageSize = 10;

		onMounted(() => {
			getData()
		})

		// 获取数据
		async function getData() {
			let params = {
				pageNum,
				pageSize
			}
			let res: any = await hotSales(params)
			products.value = res.data as Sku[]
		}
		return {
			products
		}
	}
})
</script>