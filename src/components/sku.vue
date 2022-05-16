<template>
  <div class="divide-y-2 divide-gray-500 divide-opacity-5">
    <section class="flex m-1.5">
      <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <div class="flex flex-col justify-end p-3">
        <div class="text-red-500 text-2xl">
          <span>￥</span>
          <span>1.00</span>
        </div>
        <div class="text-gray-400 text-sm">
          <span>剩余 227 件</span>
        </div>
        <div class="text-gray-400 text-sm">
          <span>请选择 颜色 尺寸 加料 非必选属性</span>
        </div>
      </div>
    </section>
    <div class="divide-y-2 divide-gray-500 divide-opacity-5 max-h-64 overscroll-y-auto overflow-y-auto">
    <section class="m-1.5">
      <p class="py-2 text-sm">
        颜色
      </p>
      <van-row gutter="10">
        <van-col span="6">
          <div class="inline-flex items-center justify-center bg-gray-100 cursor-pointer">
            <van-image width="24" height="24" src="https://b.yzcdn.cn/vant/sku/shoes-1.png" />
            <span class="text-sm p-1">粉色</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="inline-flex items-center justify-center bg-gray-100 cursor-pointer">
            <van-image width="24" height="24" src="https://b.yzcdn.cn/vant/sku/shoes-2.png" />
            <span class="text-sm p-1">黄色</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="inline-flex items-center justify-center bg-gray-100 cursor-pointer">
            <van-image width="24" height="24" src=" https://b.yzcdn.cn/vant/sku/shoes-3.png" />
            <span class="text-sm p-1">蓝色</span>
          </div>
        </van-col>
      </van-row>
    </section>
    <section class="m-1.5">
      <p class="py-2 text-sm">
        尺寸
      </p>
      <van-row gutter="10">
        <van-col span="6">
          <div class="inline-flex items-center justify-center bg-gray-100 cursor-pointer">
            <span class="py-0.5 px-3 text-sm">大</span>
          </div>
        </van-col>
        <van-col span="6">
          <div class="inline-flex items-center justify-center bg-gray-100 cursor-pointer">
            <span class="py-0.5 px-3 text-sm">小</span>
          </div>
        </van-col>
      </van-row>
    </section>
    <section class="py-2 flex justify-between">
      <span>购买数量</span>
      <van-stepper v-model.number="value" />
    </section>
        <section class="py-2 flex justify-between">
      <span>购买数量</span>
      <van-stepper v-model.number="value" />
    </section>
        <section class="py-2 flex justify-between">
      <span>购买数量</span>
      <van-stepper v-model.number="value" />
    </section>
        <section class="py-2 flex justify-between">
      <span>购买数量</span>
      <van-stepper v-model.number="value" />
    </section>
        <section class="py-2 flex justify-between">
      <span>购买数量</span>
      <van-stepper v-model.number="value" />
    </section>
        <section class="py-2 flex justify-between">
      <span>购买数量</span>
      <van-stepper v-model.number="value" />
    </section>
        <section class="py-2 flex justify-between">
      <span>购买数量</span>
      <van-stepper v-model.number="value" />
    </section>
    </div>
  </div>
  <section class="flex pt-5">
    <button class="bg-gradient-to-r from-yellow-300 to-yellow-500 p-2 w-full h-10 rounded-l-3xl text-white">加入购物车</button>
    <button class="bg-red-500 p-2 w-full h-10 rounded-r-3xl text-white">立即购买</button>
  </section>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
export default defineComponent({
	name: 'Demo',
	setup() {
		const value = ref(0)
		return {
			value
		}
	}
})
</script>