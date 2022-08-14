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
          <van-popover v-model:show="showAmount" theme="dark">
            <p class="w-20 h-10 p-2 text-center">￥{{account.amount}}</p>
            <template #reference>
              <div>
                <van-icon name="balance-pay" size="1.5rem"/>
                <span class="block text-xs">零钱</span>
              </div>
            </template>
          </van-popover>
        </div>
      </div>
<!--      订单-->
      <div class="grid grid-rows-3 grid-cols-5 gap-2 bg-white rounded-lg h-50 p-2 mb-3">
        <div class="relative col-span-5">
          <span class="font-black">我的订单</span>
          <span class="absolute right-0 text-xs" @click="$router.push('/order?status=')">全部 ></span>
        </div>
        <div class="row-span-2 text-center" v-for="(item, index) in orders" :key="index"
          @click="$router.push('/order?status=' + item.orderStatus)">
          <van-icon :name="item.icon" size="1.5rem" :badge="item.count" />
          <span class="block text-xs">{{ item.title }}</span>
        </div>
      </div>
    </section>
    <div class="px-2 mb-3">
      <ProductList title="为您推荐" :list="products"></ProductList>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, Ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { IGlobalState } from '@src/store'
import { getStatusCount, hotSales } from '@src/api/order'
import { getAccountByUserId } from '@src/api/user'
import { BaseResponseType } from "@src/models/common";
import { SysAccount } from "@src/models/usr";
import { Sku } from '@src/models/product'
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
    const showAmount = ref(false)
    let products: Ref<Sku[]> = ref([])
    let account: Ref<SysAccount> = ref({
      accountId: null,
      userId: null,
      accountCode: '',
      accountName: '',
      amount: 0
    })
    const userInfo = computed(() => {
      return store.state.auth.userInfo
    })

    const orders = ref([
      {
        icon: "peer-pay",
        title: "待付款",
        orderStatus: 0,
        count: 0
      },
      {
        icon: "send-gift-o",
        title: "待发货",
        orderStatus: 1,
        count: 0
      },
      {
        icon: "logistics",
        title: "待收货",
        orderStatus: 2,
        count: 0
      },
      {
        icon: "chat-o",
        title: "待评价",
        orderStatus: 3,
        count: 0
      },
      {
        icon: "refund-o",
        title: "退款/售后",
        orderStatus: 4,
        count: 0
      }
    ])

    onMounted(async () => {
      toggle(true)
      const res = await getStatusCount({ userId: store.state.auth.userInfo.userId }) as BaseResponseType<object>
      if (res.code === 200) {
        res.data.forEach((item: { orderStatus: number; count: number }) => {
          const index = orders.value.findIndex(i => i.orderStatus === item.orderStatus)
          if (index !== -1) {
            orders.value[index].count = item.count
          }
        })
      }
      let res1: any = await hotSales()
      products.value = res1.data as Sku[]
      await getAccount()
      toggle(false)
    })

    const getAccount = async () => {
      const { data } = await getAccountByUserId({userId: store.state.auth.userInfo.userId}) as BaseResponseType<SysAccount>
      account.value = data
    }

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
      orders,
      products,
      account,
      showAmount,
    }
  }
})
</script>
