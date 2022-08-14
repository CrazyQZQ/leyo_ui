<template>
  <div class="order-detail-box">
    <van-nav-bar title="订单详情" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="h-full px-2">
      <!-- address -->
      <div class="rounded-lg border-gray-300 shadow">
        <van-cell-group inset size="small">
          <van-cell title="收货地址">
            <template #label>
              <van-row class="h-6 align-middle leading-8">收件人：{{orderInfo.address.receiverName}}</van-row>
              <van-row class="h-6 align-middle leading-8">手机号：{{orderInfo.address.receiverTel}}</van-row>
              <van-row class="h-6 align-middle leading-8">地址：{{orderInfo.address.fullAddress}}</van-row>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="rounded-lg mt-5 border-gray-300 shadow">
        <van-list class="order-list">
          <van-card v-for="(item, index) in orderInfo.orderDetailList" :num="item.count" :price="item.sku?item.sku.price:''" :key="index"
                    :desc="(item.sku?item.sku.typeName:'') + '-' + (item.sku?item.sku.brandName:'')" :title="item.sku?item.sku.productName:''" :thumb="item.sku?item.sku.imageUrl:''">
            <template #tags>
              <van-tag class="mr-1" v-for="(attr,idx) in item.sku.skuAttributes" plain type="danger" :key="idx">{{ attr.value }}</van-tag>
            </template>
          </van-card>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, Ref, ref, toRefs, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Toast } from "vant";
import { getOrderDetail } from '@src/api/order'
import { Order } from '@src/models/order'
import { BaseResponseType } from '@src/models/common'
import { toggle } from '@src/util/useToggle'

export default {
  name: 'OrderDetail',
  components: {
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    let mainData = reactive({
      orderInfo: {
        address:{}
      }
    })
    const goBack = () => {
      router.go(-1)
    }

    onMounted(async () => {
      toggle(true)
      await getData(route.query.orderId)
      toggle(false)
    })

    const getData = async (orderId: number) => {
      const { data } = await getOrderDetail({orderId: orderId}) as BaseResponseType<Order>
      mainData.orderInfo = data
    }

    return {
      goBack,
      ...toRefs(mainData)
    };
  }
}
</script>
<style lang="less" scoped>
.order-detail-box {
  padding: 0.5rem;
  background-color: #fff;
  .order-detail-body{

  }
}
</style>
