<template>
	<div>
		<div v-if="isFetching">loading...</div>
		<div v-else class="bg-gray-100 dark:bg-gray-800 flex flex-col items-center">
			<Head title="首页" :back="false">
				<template v-slot:header-action>
					<van-icon name="chat-o" dot size="26" :color="isDark ? '#F9FAFB' : '#1F2937'" />
				</template>
			</Head>
			<!-- search-input -->
      <div @click="$router.push('/goodsList?shouHistory=1')">
        <Search @keywordChange="keyWordChange"></Search>
      </div>
			<!-- content -->
			<div class="w-11/12 mt-2">
				<Swiper :list="banners"></Swiper>
				<van-notice-bar left-icon="volume-o" :text="announcement" />
				<Category :list="cateGoryList"></Category>
				<Brand :list="brands"></Brand>
				<ProductList title="热卖商品" :list="products"></ProductList>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref } from 'vue'
import { reactive, toRefs, ref } from 'vue';
import { useDark } from '@vueuse/core'
import Head from '@components/Head.vue'
import Search from '@components/Search.vue'
import Swiper from '@src/components/Swiper.vue'
import ProductList from '@src/components/ProductList.vue'
import Category from './components/Category.vue'
import Brand from './components/Brand.vue'
import { getBanners, getAnnouncement } from '@src/api/home'
import { typeList, brandList } from '@src/api/product'
import {Sku} from "@src/models/product";
import {hotSales} from "@src/api/order";

export default defineComponent({
	name: 'Home',
	components: {
		Head,
		Search,
		Swiper,
		Category,
		Brand,
    ProductList
	},
	setup() {
		let bscroll = null
		const isDark = useDark()

		const isFetching = false

    let products: Ref<Sku[]> = ref([])
		let banners = ref([])
		let cateGoryList = ref([])
		let brands = ref([])
		let announcement = ref('暂无公告')
		onMounted(async () => {
			let res: any = await getBanners()
			if (res.code === 200) {
				banners.value = res?.data.map((e: { imageUrl: any; }) => {
					return {
						imgUrl: e.imageUrl,
						url: ''
					}
				})
			}
			let res2: any = await getAnnouncement()
			announcement.value = res2.data

			let res3: any = await typeList({ parentId: 0 })
			cateGoryList.value = res3.rows

			let res4: any = await brandList({ parentId: 0 })
			brands.value = res4.rows

      let res5: any = await hotSales()
      products.value = res5.data as Sku[]
		})

		const keyWordChange = (e: string) => {
			console.log('keyword:', e)
		}

		const toSearch = () => {
			console.log('去搜索页')
      // $router.push('/goodsList?shouHistory=1')
		}

		return {
			isFetching,
			isDark,
			cateGoryList,
			brands,
			banners,
      products,
			announcement,
			keyWordChange,
			toSearch
		}
	}
})
</script>
