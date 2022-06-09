<template>

	<div style="height:80%;width:80px;backgroud-color:red"></div>
	<van-nav-bar title="商品分类" @click-left="onClickLeft" @click-right="onClickRight">
		<template #right>
			<van-icon name="cart-o" size="18" />
		</template>
	</van-nav-bar>
	<van-search v-model="value" placeholder="请输入搜索关键词" />
	<div class="flex">
		<van-sidebar v-model="active" class="h-148" @change="onChangeCategory">
			<template v-for="(item, index) in categories" :key="index">
				<van-sidebar-item :title="item['name']" />
			</template>
		</van-sidebar>
		<div class="w-4/5 h-148 overflow-y-auto">
			<div class="px-3">
				<Swiper :list="banners"></Swiper>
			</div>
			<van-grid :column-num="3" gutter="30" :border="false" class="mt-4">
				<van-grid-item v-for="(item,index) in subCategories" :key="index">
					<van-image radius="5" width="3rem" height="3rem" src="http://124.221.239.207:9000/qqcloud/2022-05-10/qps1.jpg" />
					<span class="text-gray-500 text-sm py-3">{{item['name']}}</span>
				</van-grid-item>
			</van-grid>
		</div>
	</div>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, ref } from 'vue'
import Swiper from '@src/components/Swiper.vue'
import { typeList, brandList } from "@src/api/product";
export default defineComponent({
	name: 'Home',
	components: {
		Swiper
	},
	setup() {
		let categories = ref([])
		let subCategories = ref([])
		onMounted(async () => {
			await typeList({parentId: 0}).then(res => {
        categories.value = res.rows
        if(categories.value.length > 0){
          typeList({parentId: res.data[0].id}).then(res1 => {
            subCategories.value = res1.rows
          })
        }
      })
			
			// let res2: any = await brandList({parentId: 0})
		})


		const banerList = [
			'http://img.alicdn.com/imgextra/i3/115/O1CN01PsvX9s1Cii2Pvi3WM_!!115-0-luban.jpg',
			'https://gw.alicdn.com/imgextra/i3/43/O1CN01ZPUEId1CBjWPLKzea_!!43-0-lubanu.jpg',
			'https://gw.alicdn.com/imgextra/i2/41/O1CN01yCNeuw1CAojHBeUyC_!!41-0-lubanu.jpg',
			'http://img.alicdn.com/imgextra/i3/115/O1CN01PsvX9s1Cii2Pvi3WM_!!115-0-luban.jpg',
			'https://gw.alicdn.com/imgextra/i3/43/O1CN01ZPUEId1CBjWPLKzea_!!43-0-lubanu.jpg',
			'https://gw.alicdn.com/imgextra/i2/41/O1CN01yCNeuw1CAojHBeUyC_!!41-0-lubanu.jpg'
		]
		const value = ref('')
		const active = ref(0)
		const banners = computed(() =>
			banerList.map((e: string) => {
				return {
					imgUrl: e,
					url: ''
				}
			})
		)
		const onClickLeft = () => {
			console.log('1')
		}
		const onClickRight = () => {
			console.log('2')
		}
		const onChangeCategory = async (index: number) => {
			let res: any = await typeList({parentId: categories.value[index]['id']})
			subCategories.value = res.rows
			console.log(subCategories.value);
			
		}
		return {
			categories,
			subCategories,
			value,
			active,
			banners,
			onClickLeft,
			onClickRight,
			onChangeCategory
		}
	}
})
</script>
<style>
:root {
	--van-sidebar-width: 90px;
}
</style>