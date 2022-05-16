<template>
  <section class="h-14">
    <van-action-bar :safe-area-inset-bottom="false">
      <van-action-bar-icon icon="chat-o" text="客服" color="#7869DE" />
      <van-action-bar-icon icon="cart-o" text="购物车" color="#7869DE" />
      <van-action-bar-icon icon="shop-o" text="店铺" color="#7869DE" />
      <van-action-bar-button type="warning" text="加入购物车" />
      <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
  </section>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
	setup() {
	}
})
</script>