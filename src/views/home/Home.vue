<template>
	<div class="bg-gray-100 dark:bg-gray-800 flex flex-col items-center">
		<Head title="首页" :back="false">
			<template v-slot:header-action>
				<van-icon @click="readMessage" name="chat-o" :badge="totalUnReadMessageCount" size="26" :color="isDark ? '#F9FAFB' : '#1F2937'" />
			</template>
		</Head>
		<!-- search-input -->
		<van-sticky :offset-top="0">
			<div @click="$router.push('/goodsList?shouHistory=1')">
				<Search @keywordChange="keyWordChange"></Search>
			</div>
		</van-sticky>
		<!-- content -->
		<div class="w-full px-2 mt-2">
			<Swiper :list="banners"></Swiper>
			<van-notice-bar left-icon="volume-o" :text="announcement" />
			<Category :list="cateGoryList"></Category>
			<!-- <Brand :list="brands"></Brand> -->
			<ProductList class="mt-2" title="精选好物" :list="products"></ProductList>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, computed } from 'vue'
import { ref } from 'vue'
import { useDark } from '@vueuse/core'
import Head from '@components/Head.vue'
import Search from '@components/Search.vue'
import Swiper from '@src/components/Swiper.vue'
import ProductList from '@src/components/ProductList.vue'
import Category from './components/Category.vue'
import Brand from './components/Brand.vue'
import { getBanners, getAnnouncement } from '@src/api/home'
import { typeList, brandList } from '@src/api/product'
import { Sku, ProductType, Brand as productBrand } from '@src/models/product'
import { hotSales } from '@src/api/order'
import { BaseResponseType } from '@src/models/common'
import { toggle } from '@src/util/useToggle'
import { IGlobalState } from '@src/store'
import { useStore } from 'vuex'
import * as Types from '@src/store/modules/message/types'

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
    const store = useStore<IGlobalState>()
		const isDark = useDark()
		let products: Ref<Sku[]> = ref([])
		let banners = ref([])
		let cateGoryList = ref([])
		let brands = ref([])
		let announcement = ref('暂无公告')
		onMounted(async () => {
			toggle(true)
			let res: any = await getBanners()
			if (res.code === 200) {
				banners.value = res?.data.map((e: { imageUrl: any }) => {
					return {
						imgUrl: e.imageUrl,
						url: ''
					}
				})
			}
			let res2: any = await getAnnouncement()
			announcement.value = res2.data
			getTypes()
			getBrands()
			let res5: any = await hotSales()
			products.value = res5.data as Sku[]
			toggle(false)
		})

		const getTypes = async () => {
			const { data } = (await typeList({ parentId: 0 })) as BaseResponseType<ProductType>
			if (data.rows) {
				cateGoryList.value = data.rows
			}
		}

		const getBrands = async () => {
			const { data } = (await brandList({ parentId: 0 })) as BaseResponseType<productBrand>
			if (data.rows) {
				if (data.rows.length > 3) {
					brands.value = data.rows.slice(0, 3)
				} else {
					brands.value = data.rows
				}
			}
		}

		const keyWordChange = (e: string) => {
			console.log('keyword:', e)
		}

		const toSearch = () => {
			console.log('去搜索页')
			// $router.push('/goodsList?shouHistory=1')
		}

    const readMessage = () => {
      console.log('readMessage',totalUnReadMessageCount.value)
      if(totalUnReadMessageCount.value > 0) {
        store.dispatch(`messageInfo/${Types.READ_MESSAGE}`, '0')
      }
		}

    const totalUnReadMessageCount = computed(() => {
      return store.state.messageInfo.total
    })
		return {
			isDark,
			cateGoryList,
			brands,
			banners,
			products,
			announcement,
			keyWordChange,
			toSearch,
      totalUnReadMessageCount,
      readMessage,
		}
	}
})
</script>
