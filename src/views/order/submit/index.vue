<template>
  <div class="h-screen submit-order-body">
    <van-nav-bar title="提交订单" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="h-full">
      <!-- header -->
      <van-row class="h-24 my-3 shadow-2xl">
        <van-col span="20" class="pl-4">
          <van-row class="h-8 align-middle leading-8">收件人：qq</van-row>
          <van-row class="h-8 align-middle leading-8">手机号：13333333333</van-row>
          <van-row class="h-8 align-middle leading-8">地址：前往四川省地方的都是</van-row>
        </van-col>
        <van-col span="4" class="h-18">
          <van-icon size="1.5rem" name="arrow" class="top-7" />
        </van-col>
      </van-row>
      <van-list class="order-list">
        <van-card v-for="(item, index) in orderInfo.orderDetailList" :num="item.count" :price="item.sku.price"
          :desc="item.sku.typeName + '-' + item.sku.brandName" :title="item.sku.productName" :thumb="item.sku.imageUrl">
          <template #tags>
            <van-tag class="mr-1" v-for="attr in item.sku.skuAttributes" plain type="danger">{{ attr.value }}</van-tag>
          </template>
        </van-card>
      </van-list>
      <van-submit-bar :price="orderInfo.order.totalAmount * 100" button-text="提交订单" @submit="submit" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted,computed } from 'vue'
import { useRouter } from 'vue-router';
import { IGlobalState } from '@src/store'
import { useStore } from 'vuex'
import { saveOrder } from '@src/api/order'
import { IOrderState } from '@src/store/modules/order/interface';


export default {
  name: 'SubmitOrder',
  components: {
  },
  setup() {
    const router = useRouter()
    const store = useStore<IGlobalState>()

    let orderInfo = reactive({
      ...store.state.order
    })

    const goBack = () => {
      router.go(-1)
    }
    const submit = () => {
      let params = JSON.parse(JSON.stringify(store.state.order))
      params.order.userAddressId = 3
      params.order.userId = store.state.auth.userInfo.userId
      params.accountId = 1
      // saveOrder(params).then(res => {
      //   console.log(res)
      // })
    }






    return {
      goBack,
      submit,
      orderInfo,
    };
  }
}
</script>
<style lang="less" scoped>
.submit-order-box {}

.order-list {
  height: calc(100% - 13.5rem);
  overflow-y: auto;
}
</style>
