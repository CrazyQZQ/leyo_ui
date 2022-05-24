<script src="../../api/product.ts"></script>
<template>
<div>
  <div v-if="isFetching">loading...</div>
  <div v-else class="bg-gray-100 dark:bg-gray-800 flex flex-col items-center">
    <!-- header -->
    <Head title="首页" :back="false">
      <template v-slot:header-action>
        <van-icon name="cart-o" size="26" :color="isDark ? '#F9FAFB' : '#1F2937'" />
      </template>
    </Head>
    <!-- search-input -->
    <Search @keywordChange="keyWordChange" :onClick="toSearch"></Search>
    <!-- content -->
    <div class="w-11/12 mt-2">
      <Swiper :list="banners"></Swiper>
      <Category :list="cateGoryList"></Category>
      <Brand :list="brandList"></Brand>
      <HotSale></HotSale>
    </div>
		
    <!-- footer-table -->
  </div>
  <!-- <van-number-keyboard safe-area-inset-bottom /> -->
</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { reactive, toRefs, ref } from 'vue';
import { useDark } from '@vueuse/core'
import Head from '@components/Head.vue'
import Search from '@components/Search.vue'
import Swiper from '@src/components/Swiper.vue'
import Category from './components/Category.vue'
import Brand from './components/Brand.vue'
import HotSale from './components/HotSale.vue'
import { getBanners,getAnnouncement } from '@src/api/home'
import { typeList,brandList } from '@src/api/product'
export default defineComponent({
	name: 'Home',
	components: {
		Head,
		Search,
		Swiper,
		Category,
		Brand,
		HotSale
	},
	setup() {
		let bscroll = null
		const isDark = useDark()

		const isFetching = false

		let banners = ref([])
		let cateGoryList = ref([])
		let brandList = ref([])
    let announcement = ref('暂无公告')
    onMounted(async () => {
      let res: any = await getBanners()
      banners.value = res.data.map((e) => {
        return {
          imgUrl: e.imageUrl,
          url: ''
        }
      })

      let res2: any = await getAnnouncement()
      announcement.value = res2.data

      let res3: any = await typeList()
      cateGoryList.value = res3.rows

      let res4: any = await brandList()
      brandList.value = res4.rows
    })

		const hotList = [
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '水洗棉_床单',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/65a7ae2867d891a241dd8291a9037c84.png'
			},
			{
				goodsId: '3465',
				goodsMiniPrice: '3800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/cc507ff0ce7cafc1012885a01fb1942a.png'
			},
			{
				goodsId: '3455',
				goodsMiniPrice: '4800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/4628932649a190c464d138c9236591fa.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/d04070745e3e6b7588aba519d48ad9d6.png'
			},
			{
				goodsId: '3465',
				goodsMiniPrice: '3800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/dd9cd8d2dae44d4319ab21919021435b.png'
			},
			{
				goodsId: '3455',
				goodsMiniPrice: '4800',
				goodsName: '水洗棉_床单双人款',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/567f5588c5c86eeca8c94413d7c45e47.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/c8af5398744d2ed87d2459ec3d29d83e.png'
			},
			{
				goodsId: '3465',
				goodsMiniPrice: '3800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/09f2f2e348111984dd2c65dd8bcbf5d8.png'
			},
			{
				goodsId: '3455',
				goodsMiniPrice: '4800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/0001332cb0db9939076f56c1dddbad26.png'
			},
			{
				goodsId: '3455',
				goodsMiniPrice: '4800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/0001332cb0db9939076f56c1dddbad26.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/d04070745e3e6b7588aba519d48ad9d6.png'
			},
			{
				goodsId: '3465',
				goodsMiniPrice: '3800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/dd9cd8d2dae44d4319ab21919021435b.png'
			},
			{
				goodsId: '3455',
				goodsMiniPrice: '4800',
				goodsName: '水洗棉_床单双人款',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/567f5588c5c86eeca8c94413d7c45e47.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/c8af5398744d2ed87d2459ec3d29d83e.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/d04070745e3e6b7588aba519d48ad9d6.png'
			},
			{
				goodsId: '3465',
				goodsMiniPrice: '3800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/dd9cd8d2dae44d4319ab21919021435b.png'
			},
			{
				goodsId: '3455',
				goodsMiniPrice: '4800',
				goodsName: '水洗棉_床单双人款',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/567f5588c5c86eeca8c94413d7c45e47.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/c8af5398744d2ed87d2459ec3d29d83e.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/d04070745e3e6b7588aba519d48ad9d6.png'
			},
			{
				goodsId: '3465',
				goodsMiniPrice: '3800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/dd9cd8d2dae44d4319ab21919021435b.png'
			},
			{
				goodsId: '3455',
				goodsMiniPrice: '4800',
				goodsName: '水洗棉_床单双人款',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/567f5588c5c86eeca8c94413d7c45e47.png'
			},
			{
				goodsId: '3469',
				goodsMiniPrice: '2800',
				goodsName: '懒人沙发',
				goodsPicUrl: 'https://yanxuan.nosdn.127.net/c8af5398744d2ed87d2459ec3d29d83e.png'
			}
		]

		const keyWordChange = (e: string) => {
			console.log('keyword:', e)
		}

		const toSearch = () => {
			console.log('去搜索页')
		}

		return {
			isFetching,
			isDark,
			cateGoryList,
			brandList,
			banners,
			hotList,
      announcement,
			keyWordChange,
			toSearch
		}
	}
})
</script>
