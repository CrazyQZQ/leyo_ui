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
		<!-- <transition name="van-fade" mode="out-in"> -->
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
		<transition name="van-fade" mode="out-in">
      <section class="w-full" v-show="showHistory === '0'">
        <!--      搜索条件-->
        <van-sticky :offset-top="0">
          <van-row class="h-9 pt-2 bg-white text-gray-500 font-sans">
            <van-col span="5" :class="activeCondition==='0'?'active':''" align="center" @click="onSelectSalesSort('Desc');activeCondition='0'">综合</van-col>
            <van-col span="5" :class="activeCondition==='1'?'active':''" align="center" @click="createTimeSort">新品优先</van-col>
            <van-col span="5" align="center">
              <van-popover v-model:show="changePriceSort" :actions="sortActions" @select="onSelectPriceSort">
                <template #reference>
                  <span :class="activeCondition==='2'?'active':''">价格</span>
                  <van-icon v-show="activeCondition === '2' && priceSort === 'Asc'" color="#ff770f" name="ascending" />
                  <van-icon v-show="activeCondition === '2' && priceSort === 'Desc'" color="#ff770f" name="descending" />
                </template>
              </van-popover>
            </van-col>
            <van-col span="5" align="center">
              <van-popover v-model:show="changeSalesSort" :actions="sortActions" @select="onSelectSalesSort">
                <template #reference>
                  <span :class="activeCondition==='3'?'active':''">销量</span>
                  <van-icon v-show="activeCondition === '3' && saleSort === 'Asc'" color="#ff770f" name="ascending" />
                  <van-icon v-show="activeCondition === '3' && saleSort === 'Desc'" color="#ff770f" name="descending" />
                </template>
              </van-popover>
            </van-col>
            <van-col span="4" align="center" @click="showExtCondition = true">
              筛选<van-icon name="filter-o" />
            </van-col>
          </van-row>
        </van-sticky>
        <!--      搜索结果-->
        <div class="w-full px-2.5">
          <ProductList title="搜索结果" :list="products"></ProductList>
        </div>
      </section>
		</transition>
<!--    筛选-->
    <van-popup v-model:show="showExtCondition" position="right" :style="{ width: '70%', height: '100%' }">
      <template #default>
        <van-cell-group inset size="small">
          <van-cell title="分类">
            <template #label>
              <van-tag size="large" :color="typeName === item.name?'#ffe1e1':'#e5e7eb'" :text-color="typeName === item.name?'#ad0000':'black'"
                       class="mr-1 mb-2" v-for="item in types" :key="item.id" @click="selectType(item.name)">
                {{item.name}}
              </van-tag>
            </template>
          </van-cell>
          <van-cell title="品牌">
            <template #label>
<!--              color="#ffe1e1" class="mr-1" text-color="#ad0000"-->
              <van-tag size="large" :color="brandName === item.name?'#ffe1e1':'#e5e7eb'" :text-color="brandName === item.name?'#ad0000':'black'"
                       class="mr-1 mb-2" v-for="item in brands" :key="item.id" @click="selectBrand(item.name)">
                {{item.name}}
              </van-tag>
            </template>
          </van-cell>
          <van-cell title="价格区间">
            <template #label>
<!--              <van-tag color="#ffe1e1" class="mr-1" text-color="#ad0000">-->
<!--                酒水饮料-->
<!--              </van-tag>-->
              <van-row class="h-10">
                <van-col :span="9">
                  <input type="number" class="w-full h-8 rounded-lg focus:outline-none bg-gray-100" v-model="priceRange.min"/>
                </van-col>
                <van-col :span="4" class="h-10 text-center pt-2">
                  —
                </van-col>
                <van-col :span="9">
                  <input type="number" class="w-full h-8 rounded-lg focus:outline-none bg-gray-100 text-right" v-model="priceRange.max"/>
                </van-col>
              </van-row>
            </template>
          </van-cell>
        </van-cell-group>
        <van-row class="h-8 w-full bottom-10 absolute" justify="center" gutter="20">
          <van-col :span="10">
            <van-button round block @click="reset">重置</van-button>
          </van-col>
          <van-col :span="10">
            <van-button round type="danger" block color="#ff770f" @click="onSearch(keyword);showExtCondition=false">确定</van-button>
          </van-col>
        </van-row>
      </template>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Ref, ref, reactive, toRefs, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { IGlobalState } from '@src/store'
import { useStore } from 'vuex'
import * as Types from '@src/store/modules/cache/types'
import ProductList from '@src/components/ProductList.vue'
import { searchProduct, typeList, brandList } from '@src/api/product'
import { SearchParams, SearchItem, BaseResponseType } from '@src/models/common'
import { Sku, ProductType, Brand } from '@src/models/product'
import { Toast } from 'vant'
import { toggle } from '@src/util/useToggle'

export default {
	name: 'SubmitOrder',
	components: {
		ProductList
	},
	setup() {
		const store = useStore<IGlobalState>()
		const router = useRouter()
		const route = useRoute()
		let showHistory = ref(route.query.shouHistory || '0')
		const closeTag = ref(false)
		let showExtCondition = ref(false)
		let products: Ref<Sku[]> = ref([])
    let types: Ref<ProductType[]> = ref([])
    let brands: Ref<Brand[]> = ref([])
    // 0：综合，1：新品优先，2：价格，3：销量
    let activeCondition = ref('')
		const searchParams = reactive({
			priceSort: '',
			saleSort: '',
			brands: [],
			categories: [],
			keyword: '',
			typeName: '',
      brandName: '',
      priceRange:{
        min: null,
        max: null
      },
			sort: 'sales'
		})

    const sortActions = ref([
      { text: '默认排序', icon: '', value: null },
      { text: '从低到高', icon: 'ascending', value: 'Asc' },
      { text: '从高到低', icon: 'descending', value: 'Desc' },
    ])

    let changePriceSort = ref(false)
    let changeSalesSort = ref(false)

		const searchHistory = computed(() => {
			return store.state.cacheInfo.searchHistory
		})

    onMounted(async () => {
      toggle(true)
      let typeRes: any = await typeList({})
      types.value = typeRes.data.rows as ProductType[]
      let brandRes: any = await brandList({})
      brands.value = brandRes.data.rows as Brand[]

      const typeName = route.query.typeName as string
      const brandName = route.query.brandName as string
      console.log('typeName', typeName)
      console.log('brandName', brandName)
      if(typeName || brandName){
        showHistory.value = '0'
        searchParams.typeName = typeName
        searchParams.brandName = brandName
        await onSearch("")
      }
    })

		const onSearch = async (value: string) => {
      toggle(true)
      store.dispatch(`cacheInfo/${Types.ADD_SEARCH_HISTORY}`, value)
      showHistory.value = '0'
      let queryVos: SearchItem[] = []
      let highlightField: string[] = []
      // 处理商品名称查询条件
      if(value){
        let keywordSearchItem: SearchItem = {
          field: 'productName',
          keyword: value,
          queryType: '0'
        }
        highlightField.push('productName')
        queryVos.push(keywordSearchItem)
      }
      // 处理商品分类查询条件
      if(searchParams.typeName){
        let typeSearchItem: SearchItem = {
          field: 'typeName',
          keyword: searchParams.typeName,
          queryType: '0'
        }
        highlightField.push('typeName')
        queryVos.push(typeSearchItem)
      }
      // 处理商品品牌查询条件
      if(searchParams.brandName){
        let brandSearchItem: SearchItem = {
          field: 'brandName',
          keyword: searchParams.brandName,
          queryType: '0'
        }
        highlightField.push('brandName')
        queryVos.push(brandSearchItem)
      }
      // 处理商品价格查询条件
      if(searchParams.priceRange.min || searchParams.priceRange.max){
        let brandSearchItem: SearchItem = {
          field: 'price',
          gte: searchParams.priceRange.min || '',
          lte: searchParams.priceRange.max || '',
          queryType: '1'
        }
        queryVos.push(brandSearchItem)
      }
      let params: SearchParams = {
        highlight: true,
        highlightField: highlightField,
        indexName: 'sku',
        queryVos: queryVos,
        page: 1,
        rows: 100,
        sortIndex: searchParams.sort,
        sortOrder: searchParams.priceSort || searchParams.saleSort || 'Desc'
      }
      let res: any = await searchProduct(params)
      toggle(false)
      if (res.data) {
        products.value = res.data.list as Sku[]
      } else {
        products.value = []
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

    const goBack = () => {
			router.go(-1)
		}

    const onSelectPriceSort = (action: any) => {
      searchParams.sort = 'price'
      searchParams.priceSort = action.value
      searchParams.saleSort = ''
      activeCondition.value = '2'
      onSearch(searchParams.keyword)
		}

    const onSelectSalesSort = (action: any) => {
      searchParams.sort = 'sales'
      searchParams.saleSort = action.value
      searchParams.priceSort = ''
      activeCondition.value = '3'
      onSearch(searchParams.keyword)
		}

    const createTimeSort = () => {
      searchParams.sort = 'createTime'
      searchParams.saleSort = ''
      searchParams.priceSort = ''
      activeCondition.value = '1'
      onSearch(searchParams.keyword)
    }

    const selectType = (type: string) => {
      if(searchParams.typeName === type){
        searchParams.typeName = ''
      }else {
        searchParams.typeName = type
      }
		}

    const selectBrand = (brand: string) => {
      if(searchParams.brandName === brand){
        searchParams.brandName = ''
      }else {
        searchParams.brandName = brand
      }
    }

    const reset = () => {
      searchParams.brandName = ''
      searchParams.typeName = ''
      searchParams.priceRange = {
        min: null,
        max: null
      }
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
			products,
      goBack,
      showExtCondition,
      changePriceSort,
      changeSalesSort,
      sortActions,
      onSelectPriceSort,
      onSelectSalesSort,
      types,
      brands,
      selectType,
      selectBrand,
      reset,
      activeCondition,
      createTimeSort,
		}
	}
}
</script>
<style lang="less" scoped>
.active {
  color: #ff770f;
}
</style>