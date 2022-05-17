<template>
  <div>
    <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft" @click-right="share">
      <template #right>
        <svg t="1625494686843" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1183" width="20" height="20">
          <path d="M752 128a144 144 0 1 1-101.728 245.92l-213.312 124.608c7.136 19.136 11.04 39.84 11.04 61.472 0 20.128-3.392 39.456-9.6 57.472l222.528 91.744a144 144 0 1 1-20.256 60.864l-234.176-96.544a176 176 0 1 1-2.464-229.92l212.064-123.872A144 144 0 0 1 752 128z m32 576a80 80 0 1 0 0 160 80 80 0 0 0 0-160z m-512-256a112 112 0 1 0 0 224 112 112 0 0 0 0-224z m480-256a80 80 0 1 0 0 160 80 80 0 0 0 0-160z" fill="#000000" p-id="1184">
          </path>
        </svg>
      </template>
    </van-nav-bar>
    <Swipe></Swipe>
    <div class="bg-gray-50 overflow-scroll">
      <Title></Title>
      <Price></Price>
      <Tab></Tab>
      <ActionBar></ActionBar>
    </div>
    <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import {Toast} from 'vant';
import Swipe from './components/swipe.vue'
import Title from './components/title.vue'
import Price from './components/price.vue'
import Tab from './components/tabgood.vue'
import ActionBar from './components/actionbar.vue'
import { productInfo } from '@src/api/product'
export default defineComponent({
	name: 'Demo',
	components: {
		Swipe,
		Title,
		Price,
		Tab,
		ActionBar
	},
	setup() {
		const showShare = ref(false)
		const router = useRouter()
		const options = [
			{ name: '微信', icon: 'wechat' },
			{ name: '微博', icon: 'weibo' },
			{ name: '复制链接', icon: 'link' },
			{ name: '分享海报', icon: 'poster' },
			{ name: '二维码', icon: 'qrcode' }
		]
		const onClickLeft = () => {
			router.go(-1)
		}
		const share = () => {
			showShare.value=true
		}
		const onSelect = (option:any) => {
			Toast(option.name)
			showShare.value = false
		}
		return {
			onClickLeft,
			share,
			showShare,
			options,
			onSelect
		}
	}
})
</script>