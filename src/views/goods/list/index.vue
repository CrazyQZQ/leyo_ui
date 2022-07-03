<template>
  <div class="bg-gray-100 dark:bg-gray-800 flex flex-col items-center">
    <!--    搜索框-->
    <div class="w-full">
      <form action="/">
        <van-search v-model="keyword" show-action placeholder="请输入搜索关键词" @click-input="clickInput"
                    @search="onSearch" @cancel="onCancel" @keyup.enter="onSearch(keyword)"/>
      </form>
    </div>
    <transition name="van-slide-left">
      <section class="search-body w-full px-2.5 border-black" v-show="showHistory === '1'">
        <!--      搜索历史-->
        <div class="van-hairline--bottom pb-1.5 relative">
          <div class="relative w-full h-7">
            <span class="font-bold">历史搜索</span>
            <span class="absolute top-px right-px">
            <van-icon name="delete-o" @click="closeTag = !closeTag"/>
          </span>
          </div>
          <div class="van-multi-ellipsis--l2">
            <van-tag class="mr-2" size="medium" round color="#e5e7eb" text-color="black" :closeable="closeTag"
                     v-for="(item,index) in searchHistory" :key="index" @click="clickTag(item)"
                     @close="deleteHistory(index)">{{ item }}
            </van-tag>
          </div>
        </div>
      </section>
    </transition>
    <transition name="van-slide-left">
      <section class="w-full" v-show="showHistory === '0'">
        <!--      搜索条件-->
        <div class="w-full">
          <van-dropdown-menu>
            <van-dropdown-item v-model="priceSort" :options="sortOptions" @change="changeSort()">
              <template #title>
                <span>价格</span>
                <van-icon v-show="priceSort === 'asc'" color="#ad0000" name="ascending" />
                <van-icon v-show="priceSort === 'desc'" color="#ad0000" name="descending" />
              </template>
            </van-dropdown-item>
            <van-dropdown-item v-model="saleSort" :options="sortOptions" @change="changeSort()">
              <template #title>
                <span>销量</span>
                <van-icon v-show="saleSort === 'asc'" color="#ad0000" name="ascending" />
                <van-icon v-show="saleSort === 'desc'" color="#ad0000" name="descending" />
              </template>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
        <!--      搜索结果-->
        <div class="w-full px-2.5">
          <ProductList title="搜索结果"></ProductList>
        </div>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, toRefs, computed} from 'vue'
import {useRouter, useRoute} from 'vue-router';
import {IGlobalState} from '@src/store'
import {useStore} from 'vuex'
import * as Types from '@src/store/modules/cache/types'
import ProductList from '@src/components/ProductList.vue'
import {Toast} from 'vant'

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
    const searchParams = reactive({
      priceSort: '',
      saleSort: '',
      brands: [],
      categories: [],
      keyword: '',
    })
    const sortOptions = ref([{text:'默认排序',value:''},{text:'从低到高',value:'asc'},{text:'从高到低',value:'desc'}])
    const searchHistory = computed(() => {
      return store.state.cacheInfo.searchHistory
    })

    const onSearch = (value: string) => {
      if (value) {
        store.dispatch(`cacheInfo/${Types.ADD_SEARCH_HISTORY}`, value)
        showHistory.value = '0'
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

    const changeSort = () => {
      console.log(searchParams)
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
    };
  }
}
</script>
