<template>
  <van-tabbar v-model="active" fixed placeholder safe-area-inset-bottom active-color="#ff770f">
    <van-tabbar-item v-for="(item,index) in tabs" :key="index" :icon="item.icon" :to="item.path">{{item.title}}</van-tabbar-item>
  </van-tabbar>
</template>

<script lang='ts'>
import {defineComponent, ref, onMounted} from 'vue';
import {useRoute} from 'vue-router'

export default defineComponent({
  name: 'TabBar',
  setup() {
    const route = useRoute()
    let active = ref(0)
    const tabs = ref([{
      title: '首页',
      icon: 'home-o',
      path: '/'
    }, {
      title: '分类',
      icon: 'qr',
      path: '/category'
    }, {
      title: '购物车',
      icon: 'cart-o',
      path: '/shoppingCart'
    }, {
      title: '我的',
      icon: 'user-o',
      path: '/me'
    }])
    onMounted(() => {
      const index = tabs.value.findIndex(item => item.path === route.path)
      active.value = index
    })
    return {
      active,
      tabs,
    }
  }
})
</script>