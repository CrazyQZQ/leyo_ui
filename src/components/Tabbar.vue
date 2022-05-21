<template>
    <van-tabbar v-model="active" fixed placeholder safe-area-inset-bottom>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="qr" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/shoppingCart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/me">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
export default defineComponent({
name:'Demo',
setup(){
  		let active = ref(0)
      return {
        		active,
      }
}
})
</script>