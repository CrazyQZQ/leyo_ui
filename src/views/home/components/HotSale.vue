<!--  -->
<template>
  <line-bLock>热销商品</line-bLock>
	<div class="rounded-lg bg-white">
  <div class="grid grid-cols-2 gap-2 p-2">
    <div v-for="(item) in products" :key="item.id" class="h-52 w-full bg-white" @click="$router.push('/goodsDetail?id='+item.id)">
      <div class="h-36">
        <img class="h-full w-full" :src="item.imageUrls?item.imageUrls[0]:''" />
      </div>
      <p class="w-full  px-1 py-0.5 text-xs truncate text-gray-500 font-sans">{{item.name}}</p>
      <p class="w-full  px-1 py-0.5 text-xs truncate text-gray-500 font-sans">{{item.stock}}</p>
      <p class="w-full  px-1 py-0.5 text-xs truncate font-sans text-red-500">￥{{item.price}}</p>
    </div>
  </div>
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref ,Ref} from 'vue'
import LineBLock from '@src/components/lineblock.vue'
import { productList } from "@src/api/product";
import { Product } from "@src/models";
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
			let res: any = await productList(params)
			products.value = res.rows as Product[]
		}
		return {
			products
		}
	}
})
</script>