<template>
	<div>
		<van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" @click-right="share">
			<template #right>
				<svg t="1625494686843" class="icon" viewBox="0 0 1024 1024" version="1.1"
					xmlns="http://www.w3.org/2000/svg" p-id="1183" width="20" height="20">
					<path
						d="M752 128a144 144 0 1 1-101.728 245.92l-213.312 124.608c7.136 19.136 11.04 39.84 11.04 61.472 0 20.128-3.392 39.456-9.6 57.472l222.528 91.744a144 144 0 1 1-20.256 60.864l-234.176-96.544a176 176 0 1 1-2.464-229.92l212.064-123.872A144 144 0 0 1 752 128z m32 576a80 80 0 1 0 0 160 80 80 0 0 0 0-160z m-512-256a112 112 0 1 0 0 224 112 112 0 0 0 0-224z m480-256a80 80 0 1 0 0 160 80 80 0 0 0 0-160z"
						fill="#000000" p-id="1184">
					</path>
				</svg>
			</template>
		</van-nav-bar>
		<!-- swipe -->
		<van-swipe class="w-full h-90 rounded-md shadow-sm" :autoplay="3000" indicator-color="#fff">
			<van-swipe-item v-for="(item, index) in product.imageUrls" :key="index">
				<img :src="item" :alt="product.name"/>
			</van-swipe-item>
		</van-swipe>
		<div class="bg-gray-50 overflow-scroll">
			<!-- title -->
			<section class="flex justify-between items-center bg-white divide-x divide-gray-200">
				<div class="p-3">
					<span class="font-semibold text-base leading-3">{{product.name}}</span>
					<p class="text-gray-500 text-sm">品牌：{{product.brandName}}</p>
<!--					<p class="text-gray-500 text-sm">系列：秋季上新</p>-->
				</div>
				<div class="min-w-1/4 ">
					<p class="text-center">
						<van-tag round color="#7869DE" size="large">优惠价</van-tag>
					</p>
					<p class="text-yellow-500 font-bold text-lg text-center">￥{{product.price}}</p>
				</div>
			</section>
			<!-- Price -->
			<section class="mt-2 bg-white divide-y divide-gray-50">
				<p class="flex justify-between p-3 text-gray-500 text-xs">
					<span>指导零售价</span>
					<span>￥{{product.price}}</span>
				</p>
				<p class="flex justify-between p-3 text-gray-500 text-xs">
					<span>最低购买数量</span>
					<span>999件</span>
				</p>
<!--				<p class="flex justify-between p-3 text-gray-500 text-xs" @click="selectSku">-->
<!--					<span>已选</span>-->
<!--					<span class="text-black">-->
<!--						请选择规格 数量-->
<!--						<van-icon name="arrow" />-->
<!--					</span>-->
<!--				</p>-->
			</section>
			<!-- Tab -->
			<section class="mt-2 bg-white">
				<van-tabs v-model:active="activeName">
					<van-tab title="商品介绍" name="a">
						<p>商品介绍</p>
					</van-tab>
					<van-tab title="商品配置" name="b">商品配置</van-tab>
				</van-tabs>
			</section>
			<section class="h-14">
				<van-action-bar :safe-area-inset-bottom="false">
					<van-action-bar-icon icon="chat-o" text="客服" color="#7869DE" />
					<van-action-bar-icon icon="cart-o" text="购物车" @click="goToUrL('/shoppingCart')"  color="#7869DE" />
					<van-action-bar-icon icon="shop-o" text="店铺" color="#7869DE" />
					<van-action-bar-button type="warning" text="加入购物车" @click="selectSku(1)"/>
					<van-action-bar-button type="danger" text="立即购买" @click="selectSku(2)"/>
				</van-action-bar>
        <van-popup v-model:show="show" round position="bottom" :style="{ padding: '15px' }">
          <sku :product="product" :submitType="submitType"></sku>
        </van-popup>
			</section>
		</div>
		<van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
	</div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted, Ref } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { Toast } from 'vant';
import { useToggle } from '@vant/use'
import { productInfo } from "@src/api/product";
import { Product } from "@src/models";
import sku from '@components/sku.vue';
export default defineComponent({
	name: 'ProductDetail',
	components: {
		sku
	},
	setup() {
		const route = useRoute()
		let product: Ref<Product> = ref({});
		onMounted(async () => {
			let res: any = await productInfo({ id: route.query.id })
			product.value = res.data as Product
			product.value.imageUrls = product.value.imageUrls?product.value.imageUrls:[]
		})
		const showShare = ref(false)
		const router = useRouter()
    let submitType: Ref<number> = ref(1)
		const options = [
			{ name: '微信', icon: 'wechat' },
			{ name: '微博', icon: 'weibo' },
			{ name: '复制链接', icon: 'link' },
			{ name: '分享海报', icon: 'poster' },
			{ name: '二维码', icon: 'qrcode' }
		]
		const goToUrL = (url: string) => {
      router.push(url)
		}
		const onClickLeft = () => {
			router.go(-1)
		}
		const share = () => {
			showShare.value = true
		}
		const onSelect = (option: any) => {
			Toast(option.name)
			showShare.value = false
		}
		const [show, toggle] = useToggle()
		toggle(false)
		const selectSku = (type: number) => {
			toggle(true)
      submitType.value = type
		}
		const activeName = ref('a')
		return {
			onClickLeft,
			share,
			showShare,
			options,
			onSelect,
			goToUrL,
			show,
			selectSku,
			activeName,
			product,
      submitType
		}
	}
})
</script>