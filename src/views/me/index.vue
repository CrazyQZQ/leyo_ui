<template>
  <div class="relative bg-gray-100" style="height: calc(100vh - 3.15rem); overflow-y: auto">
    <!--    <div class="h-40 w-full bg-purple-500 rounded-b-6xl"></div>-->
<!--    用户信息-->
    <div class="relative w-full h-50 p-4">
      <div class="grid grid-rows-3 grid-cols-4 grid-flow-col gap-2">
        <div class="row-span-3 w-24">
          <van-image round width="5rem" height="5rem" :src="userInfo.avatar" />
        </div>
        <div class="col-span-3 font-bold">{{ userInfo.nickName }}</div>
        <div class="col-span-3 text-gray-400">登录名：{{ userInfo.userName }}</div>
        <div class="col-span-3">手机号：{{ userInfo.phoneNumber }}</div>
      </div>
      <!--    设置-->
      <div class="absolute top-3.5 right-3.5">
        <van-icon name="setting-o" size="1.5rem" @click="$router.push('/setting')"/>
      </div>
    </div>
    <section class="w-full justify-center px-4">
<!--      收藏-->
      <div class="grid grid-cols-3 grid-cols-4 gap-2 bg-white rounded-lg h-50 p-2 mb-3">
        <div class="row-span-2 text-center">
          <van-icon name="star-o" size="1.5rem"/>
          <span class="block text-xs">收藏</span>
        </div>
        <div class="row-span-2 text-center">
          <van-icon name="certificate" size="1.5rem"/>
          <span class="block text-xs">订阅</span>
        </div>
        <div class="row-span-2 text-center">
          <van-icon name="underway-o" size="1.5rem"/>
          <span class="block text-xs">足迹</span>
        </div>
        <div class="row-span-2 text-center">
          <van-icon name="balance-pay" size="1.5rem"/>
          <span class="block text-xs">零钱</span>
        </div>
      </div>
<!--      订单-->
      <div class="grid grid-rows-3 grid-cols-5 gap-2 bg-white rounded-lg h-50 p-2 mb-3">
        <div class="relative col-span-5">
          <span class="font-black">我的订单</span>
          <span class="absolute right-0 text-xs" @click="$router.push('/order?status=')">全部 ></span>
        </div>
        <div class="row-span-2 text-center" v-for="(item, index) in orders" :key="index"
          @click="$router.push('/order?status=' + item.status)">
          <van-icon :name="item.icon" size="1.5rem" :badge="item.count" />
          <span class="block text-xs">{{ item.title }}</span>
        </div>
      </div>
    </section>
    <div class="px-2 mb-3">
      <ProductList title="为您推荐"></ProductList>
    </div>
    <!--    <section class="w-full flex justify-center px-4 -mt-16">-->
    <!--      &lt;!&ndash;      我的订单&ndash;&gt;-->
    <!--      <div class="rounded-lg bg-white h10">-->
    <!--        <div class="h-full w5">-->
    <!--          <van-icon name="peer-pay"/>-->
    <!--        </div>-->
    <!--        <ul class="user-list">-->
    <!--          <li class="van-hairline&#45;&#45;bottom" @click="goTo('/order', {})">-->
    <!--            <span>我的订单</span>-->
    <!--            <van-icon name="arrow"/>-->
    <!--          </li>-->
    <!--          <li class="van-hairline&#45;&#45;bottom" @click="goTo('/setting', {})">-->
    <!--            <span>账号管理</span>-->
    <!--            <van-icon name="arrow"/>-->
    <!--          </li>-->
    <!--          <li class="van-hairline&#45;&#45;bottom" @click="goTo('/address', {})">-->
    <!--            <span>地址管理</span>-->
    <!--            <van-icon name="arrow"/>-->
    <!--          </li>-->
    <!--          <li @click="goTo('/about', {})">-->
    <!--            <span>关于我们</span>-->
    <!--            <van-icon name="arrow"/>-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--      </div>-->
    <!--    </section>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { IGlobalState } from '@src/store'
import { getStatusCount } from '@src/api/order'
import { BaseResponseType } from "@src/models/common";
import ProductList from '@src/components/ProductList.vue'
import { toggle } from '@src/util/useToggle'

export default defineComponent({
  name: 'me',
  components: {
    ProductList
  },
  setup() {
    const loading = false
    const router = useRouter()
    const store = useStore<IGlobalState>()
    const userInfo = computed(() => {
      return store.state.auth.userInfo
    })

    const orders = ref([
      {
        icon: "peer-pay",
        title: "待付款",
        status: 0,
        count: 0
      },
      {
        icon: "send-gift-o",
        title: "待发货",
        status: 1,
        count: 0
      },
      {
        icon: "logistics",
        title: "待收货",
        status: 2,
        count: 0
      },
      {
        icon: "chat-o",
        title: "待评价",
        status: 3,
        count: 0
      },
      {
        icon: "refund-o",
        title: "退款/售后",
        status: 4,
        count: 0
      }
    ])

    onMounted(async () => {
      toggle(true)
      const res = await getStatusCount({ userId: store.state.auth.userInfo.userId }) as BaseResponseType<object>
      if (res.code === 200) {
        res.data.forEach((item: { status: number; count: number }) => {
          const index = orders.value.findIndex(i => i.status === item.status)
          if (index !== -1) {
            orders.value[index].count = item.count
          }
        })
      }
      toggle(false)
    })
    const goBack = () => {
      router.go(-1)
    }

    const goTo = (r: string, query: any) => {
      router.push({ path: r, query: query || {} })
    }
    return {
      userInfo,
      loading,
      goBack,
      goTo,
      orders
    }
  }
})
</script>
