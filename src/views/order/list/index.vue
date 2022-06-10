<template>
  <div class="h-full">
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
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="w-full" style="height: 500px;overflow-y: auto;">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          offset="10"
          @load="onLoad"
          :immediate-check="false"
          class="h-full w-full"
        >
          <div v-for="(item, index) in list" :key="index" class="shadow-md p-1 m-5 bg-white rounded-lg" @click="goTo(item.id)">
            <div class="order-item-header">
              <span>订单时间：{{ item.createTime }}</span>
              <span>{{ item.addressName }}</span>
            </div>
            <van-card
              v-for="one in item.orderDetailList"
              :key="one.id"
              :num="one.count"
              :price="one.sku.price"
              :desc="one.sku.typeName + ' ' + one.sku.brandName"
              :title="one.productName"
              :thumb="one.sku.imageUrl"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import { getOrderList } from '@src/api/order.ts'
import { useRouter,useRoute } from 'vue-router';
import { useStore } from 'vuex'
import { IGlobalState } from '@src/store'

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
      list: [],
      page: 1,
      total: 0
    })

    onMounted(() => {
      state.orderStatus = route.query.status || ''
      loadData()
    })

    const loadData = async () => {
      if(state.finished){
        state.loading = false;
        return
      }
      await getOrderList({ pageNum: state.page,pageSize:10, status: state.orderStatus, userId: store.state.auth.userInfo.userId })
      .then(res => {
        state.list = state.list.concat(res.rows)
        state.total = res.total
        if(state.list.length >= state.total) {
          state.finished = true;
        }
      })
      state.loading = false;
    }

    const onChangeTab = (name) => {
      state.orderStatus = name
      onRefresh()
    }

    const goTo = (id) => {
      router.push({ path: '/orderDetail', query: { id } })
    }

    const goBack = () => {
      router.go(-1)
    }

    const onLoad = () => {
      console.log('onload')
      if (state.refreshing) {
        state.list = [];
        state.refreshing = false;
      }
      if (!state.refreshing && state.list.length < state.total) {
        state.page = state.page + 1
      }
      loadData()
    }

    const onRefresh = () => {
      console.log('onRefresh')
      state.refreshing = true
      state.finished = false
      state.loading = true
      state.page = 1
      onLoad()
    }

    return {
      ...toRefs(state),
      onChangeTab,
      goTo,
      goBack,
      onLoad,
      onRefresh
    }
  }
}
</script>