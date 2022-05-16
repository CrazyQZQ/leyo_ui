<template>

  <div style="height:80%;width:80px;backgroud-color:red"></div>
  <van-nav-bar title="商品分类" @click-left="onClickLeft" @click-right="onClickRight">
    <template #right>
      <van-icon name="cart-o" size="18" />
    </template>
  </van-nav-bar>
  <van-search v-model="value" placeholder="请输入搜索关键词" />
  <div class="flex">
    <van-sidebar v-model="active" class="h-148">
      <van-sidebar-item title="推荐专区" />
      <van-sidebar-item title="冬季专区" />
      <van-sidebar-item title="爆品专区" />
      <van-sidebar-item title="居家好物" />
      <van-sidebar-item title="鞋包配饰" />
      <van-sidebar-item title="服装配饰" />
      <van-sidebar-item title="家用电器" />
      <van-sidebar-item title="洗护美妆" />
      <van-sidebar-item title="饮食酒水" />
      <van-sidebar-item title="餐具厨房" />
      <van-sidebar-item title="母婴亲子" />
    </van-sidebar>
    <div class="w-4/5 h-148 overflow-y-auto">
      <div class="px-3">
        <Swiper :list="banners"></Swiper>
      </div>
      <van-grid :column-num="3" gutter="30" :border="false" class="mt-4">
        <van-grid-item v-for="value in 9" :key="value">
          <van-image round width="3rem" height="3rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <span class="text-gray-500 text-sm py-3">全球购</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, ref } from 'vue'
import Swiper from '@src/components/Swiper.vue'
import useStore from '@src/store/home'
export default defineComponent({
	name: 'Demo',
	components: {
		Swiper
	},
	setup() {
		const [banerList, getHomeData] = useStore((state) => [state.banerList, state.getHomeData])
		const value = ref('')
		const active = ref(1)
		const banners = computed(() =>
			banerList.value.map((e: string) => {
				return {
					imgUrl: e,
					url: ''
				}
			})
		)
		onMounted(() => {
			getHomeData()
		})
		const onClickLeft = () => {
			console.log('1')
		}
		const onClickRight = () => {
			console.log('2')
		}
		return {
			value,
			active,
			banners,
			onClickLeft,
			onClickRight
		}
	}
})
</script>
<style>
:root {
	--van-sidebar-width: 90px;
}
</style>