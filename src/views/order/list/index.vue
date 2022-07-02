<template>
  <div class="me-container">
    <van-nav-bar title="我的订单" left-arrow @click-left="goBack"></van-nav-bar>
    <van-tabs @click="onChangeTab" :color="'#1baeae'" :title-active-color="'#1baeae'" v-model:active="orderStatus">
      <van-tab title="全部" name=''></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="待发货" name="1"></van-tab>
      <van-tab title="待收货" name="2"></van-tab>
      <van-tab title="待评价" name="3"></van-tab>
      <van-tab title="退款/售后" name="4"></van-tab>
    </van-tabs>
    <div class="h-full w-full">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="w-full h-full" style="overflow-y: auto;">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" offset="90" @load="onLoad"
          :immediate-check="false" class="w-full" style="height: 42.6rem;">
          <div v-for="(item, index) in list" :key="index" class="shadow-md p-1 m-5 bg-white rounded-lg van-hairline--top"
            @click="goTo(item.id)">
            <van-row class="text-sm px-2">
              <van-row>
                <span class="font-bold">订单编号：</span>
                <span class="text-red-500">{{ item.number }}</span>
              </van-row>
              <van-row>
                <span class="font-bold">收货地址：</span>
                <span class="text-gray-400">{{ item.addressName }}</span>
              </van-row>
            </van-row>
            <van-card v-for="one in item.orderDetailList" :key="one.id" :num="one.count" :price="one.sku.price"
              :desc="one.sku.typeName + ' ' + one.sku.brandName" :title="one.productName" :thumb="one.sku.imageUrl?one.sku.imageUrl:defaultErrorImage">
              <template #footer>
                <span class="font-bold">价格：</span>
                <span class="text-red-500">￥{{ item.totalAmount }}</span>
              </template>
            </van-card>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { getOrderList } from '@src/api/order'
import { Order,OrderDetail } from '@src/models/order'
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex'
import { IGlobalState } from '@src/store'
import { defaultErrorImage } from "@src/common/common";

export default {
  name: 'Order',
  components: {
  },
  setup() {
    const store = useStore<IGlobalState>()
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      orderStatus: '',
      loading: false,
      finished: false,
      refreshing: false,
      list: Array<Order>[],
      page: 1,
      total: 0
    })

    onMounted(() => {
      state.orderStatus = route.query.status
      loadData()
    })

    const loadData = () => {
      if (state.finished) {
        state.loading = false;
        return
      }
      getOrderList({ pageNum: state.page, pageSize: 10, status: state.orderStatus, userId: store.state.auth.userInfo.userId })
        .then(res => {
          state.list = state.list.concat(res.rows)
          state.total = res.total
          state.loading = false;
          if (state.list.length >= state.total) {
            state.finished = true;
          }
        })

    }

    const onChangeTab = (name: string) => {
      state.orderStatus = name
      onRefresh()
    }

    const goTo = (id: number) => {
      router.push({ path: '/orderDetail', query: { id } })
    }

    const goBack = () => {
      router.go(-1)
    }

    const onLoad = () => {
      if (state.refreshing) {
        state.list.length = 0
        state.page = 1
        state.refreshing = false;
      } else if (state.list.length < state.total) {
        state.page = state.page + 1
      }
      loadData()
    }

    const onRefresh = () => {
      state.refreshing = true
      state.finished = false
      state.loading = true
      onLoad()
    }

    return {
      ...toRefs(state),
      onChangeTab,
      goTo,
      goBack,
      onLoad,
      onRefresh,
      defaultErrorImage
    }
  }
}
</script>