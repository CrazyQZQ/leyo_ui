<template>
	<div class="flex flex-col items-center h-full bg-gray-50">
		<!--    搜索框-->
		<van-row class="w-full">
			<van-col span="2" class="text-center bg-white">
        <van-icon name="arrow-left" class="top-1/3" size="20" @click="goBack"/>
      </van-col>
			<van-col span="22">
        <form action="/">
				<van-search
					v-model="keyword"
          shape="round"
					show-action
					placeholder="请输入搜索关键词"
					@click-input="clickInput"
					@search="onSearch"
					@keyup.enter="onSearch(keyword)"
				>
					<template #action>
						<div @click="onSearch(keyword)">搜索</div>
					</template>
				</van-search>
			</form>
      </van-col>
		</van-row>
		<section class="search-body w-full px-2.5 border-black bg-white" v-show="showHistory === '1'">
			<!--      搜索历史-->
			<div class="van-hairline--bottom pb-1.5 relative">
				<div class="relative w-full h-7">
					<span class="font-bold">历史搜索</span>
					<span class="absolute top-px right-px">
						<van-icon name="delete-o" v-show="!closeTag" @click="closeTag = true" />
						<van-icon name="passed" v-show="closeTag" @click="closeTag = false" />
					</span>
				</div>
				<div class="van-multi-ellipsis--l2">
					<van-tag
						class="mr-2"
						size="medium"
						round
						color="#e5e7eb"
						text-color="black"
						:closeable="closeTag"
						v-for="(item,index) in searchHistory"
						:key="index"
						@click="clickTag(item)"
						@close="deleteHistory(index)"
					>{{ item }}</van-tag>
				</div>
			</div>
		</section>
		<!-- </transition> -->
		<!-- <transition name="van-fade"> -->
		<section class="w-full" v-show="showHistory === '0'">
			<!--      搜索条件-->
			<van-row class="h-9 pt-2 bg-white text-gray-500 font-sans">
				<van-col span="5" align="center">综合</van-col>
				<van-col span="5" align="center">新品优先</van-col>
				<van-col span="5" align="center">价格</van-col>
				<van-col span="5" align="center">销量</van-col>
				<van-col span="4" align="center">筛选</van-col>
			</van-row>
			<!-- <div class="w-full">
          <van-dropdown-menu>
            <van-dropdown-item v-model="priceSort" :options="sortOptions" @change="changeSort('0')">
              <template #title>
                <span>价格</span>
                <van-icon v-show="priceSort === 'Asc'" color="#ad0000" name="ascending" />
                <van-icon v-show="priceSort === 'Desc'" color="#ad0000" name="descending" />
              </template>
            </van-dropdown-item>
            <van-dropdown-item v-model="saleSort" :options="sortOptions" @change="changeSort('1')">
              <template #title>
                <span>销量</span>
                <van-icon v-show="saleSort === 'Asc'" color="#ad0000" name="ascending" />
                <van-icon v-show="saleSort === 'Desc'" color="#ad0000" name="descending" />
              </template>
            </van-dropdown-item>
          </van-dropdown-menu>
			</div>-->
			<!--      搜索结果-->
			<div class="w-full px-2.5">
				<ProductList title="搜索结果" :list="products"></ProductList>
			</div>
		</section>
		<!-- </transition> -->
	</div>
</template>

<script lang="ts">
import { Ref, ref, reactive, toRefs, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { IGlobalState } from '@src/store'
import { useStore } from 'vuex'
import * as Types from '@src/store/modules/cache/types'
import ProductList from '@src/components/ProductList.vue'
import { searchProduct } from '@src/api/product'
import { SearchParams, SearchItem, BaseResponseType } from '@src/models/common'
import { Sku } from '@src/models/product'
import { Toast } from 'vant'

export default {
	name: 'SubmitOrder',
	components: {
		ProductList
	},
	setup() {
		const target = ref(null)
		const store = useStore<IGlobalState>()
		const router = useRouter()
		const route = useRoute()
		let showHistory = ref(route.query.shouHistory || '0')
		const closeTag = ref(false)
		let products: Ref<Sku[]> = ref([])
		const searchParams = reactive({
			priceSort: null,
			saleSort: null,
			brands: [],
			categories: [],
			keyword: '',
			sort: 'sales'
		})
		const sortOptions = ref([
			{ text: '默认排序', value: '' },
			{ text: '从低到高', value: 'Asc' },
			{ text: '从高到低', value: 'Desc' }
		])
		const searchHistory = computed(() => {
			return store.state.cacheInfo.searchHistory
		})

		const onSearch = async (value: string) => {
			if (value) {
				store.dispatch(`cacheInfo/${Types.ADD_SEARCH_HISTORY}`, value)
				showHistory.value = '0'
				let keywordSearchItem: SearchItem = {
					field: 'productName',
					keyword: value,
					queryType: '0'
				}
				let params: SearchParams = {
					highlight: true,
					highlightField: ['productName'],
					indexName: 'sku',
					queryVos: [keywordSearchItem],
					page: 1,
					rows: 100,
					sortIndex: searchParams.sort,
					sortOrder: searchParams.priceSort || searchParams.saleSort || 'Desc'
				}
				let res: any = await searchProduct(params)
				if (res.data) {
					products.value = res.data.list as Sku[]
				} else {
					products.value = []
				}
			} else {
				Toast.fail('请输入搜索关键词')
			}
		}

		const onCancel = () => {
			showHistory.value = '0'
		}

		const clickInput = () => {
			showHistory.value = '1'
		}

		const clickTag = (value: string) => {
			if (!closeTag.value) {
				searchParams.keyword = value
				onSearch(value)
			}
		}

		const deleteHistory = (index: number) => {
			store.dispatch(`cacheInfo/${Types.DELETE_SEARCH_HISTORY}`, index)
		}

		const changeSort = (flag: string) => {
			if ('0' === flag) {
				searchParams.saleSort = null
				searchParams.sort = 'price'
			} else {
				searchParams.priceSort = null
				searchParams.sort = 'sales'
			}
			onSearch(searchParams.keyword)
		}

    const goBack = () => {
			router.go(-1)
		}
		return {
			onSearch,
			onCancel,
			showHistory,
			clickInput,
			searchHistory,
			deleteHistory,
			closeTag,
			clickTag,
			...toRefs(searchParams),
			sortOptions,
			changeSort,
			products,
      goBack,
		}
	}
}
</script>
