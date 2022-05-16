<template>
  <section class="mt-2 bg-white">
    <van-tabs v-model:active="activeName">
      <van-tab title="商品介绍" name="a">
        <p>商品介绍</p>
        <p>商品介绍</p>
        <p>商品介绍</p>
        <p>商品介绍</p>
        <p>商品介绍</p>
        <p>商品介绍</p>
        <p>商品介绍</p>
        <p>商品介绍</p>
        <p>商品介绍</p>
        <p>商品介绍</p>
        <p>商品介绍</p>
      </van-tab>
      <van-tab title="商品配置" name="b">商品配置</van-tab>
    </van-tabs>
  </section>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
export default defineComponent({
	setup() {
		const activeName = ref('a')
		return {
			activeName
		}
	}
})
</script>