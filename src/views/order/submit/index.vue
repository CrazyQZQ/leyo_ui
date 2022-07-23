<template>
  <div class="h-screen submit-order-body">
    <van-nav-bar title="提交订单" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="h-full">
      <!-- address -->
      <van-cell-group inset size="small">
        <van-cell :title="curAddress?'收货地址':'选择收货地址'" is-link to="address">
          <template #label v-if="curAddress">
            <van-row class="h-6 align-middle leading-8">收件人：{{curAddress.receiverName}}</van-row>
            <van-row class="h-6 align-middle leading-8">手机号：{{curAddress.receiverTel}}</van-row>
            <van-row class="h-6 align-middle leading-8">地址：{{curAddress.fullAddress}}</van-row>
          </template>
        </van-cell>
      </van-cell-group>
      <van-list class="order-list">
        <van-card v-for="(item, index) in orderInfo.orderDetailList" :num="item.count" :price="item.sku?item.sku.price:''" :key="index"
          :desc="(item.sku?item.sku.typeName:'') + '-' + (item.sku?item.sku.brandName:'')" :title="item.sku?item.sku.productName:''" :thumb="item.sku?item.sku.imageUrl:''">
          <template #tags>
            <van-tag class="mr-1" v-for="(attr,idx) in item.sku.skuAttributes" plain type="danger" :key="idx">{{ attr.value }}</van-tag>
          </template>
        </van-card>
      </van-list>
      <van-submit-bar :price="orderInfo.order.totalAmount * 100" button-text="提交订单" @submit="submit" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref,Ref, reactive, onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router';
import { IGlobalState } from '@src/store'
import { useStore } from 'vuex'
import { saveOrder } from '@src/api/order'
import { IOrderState } from '@src/store/modules/order/interface';
import { userDefaultAddress, queryAddressById } from '@src/api/user'
import { UserAddress } from "@src/models/user";


export default {
  name: 'SubmitOrder',
  components: {
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore<IGlobalState>()

    let curAddress: Ref<UserAddress> = ref({
      userId: -1,
      receiverName: '',
      receiverTel: '',
      defaultStatus: 0,
      postCode: '',
      province: '',
      city: '',
      region: '',
      areaCode: '',
      detailAddress: '',
      fullAddress: ''
    })
    let orderInfo = reactive({
      ...store.state.order
    })

    onMounted(async () => {
      let userId = store.state.auth.userInfo.userId
      let addressId = route.params.addressId
      if(addressId){
        let res: any = await queryAddressById({ id: addressId })
        if(res.data){
          curAddress.value = res.data as UserAddress
        }
      }else if (userId) {
        let res: any = await userDefaultAddress({ userId: userId })
        if(res.data){
          curAddress.value = res.data as UserAddress
        }
      }
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
      curAddress,
    };
  }
}
</script>
<style lang="less" scoped>

.order-list {
  height: calc(100% - 13.5rem);
  overflow-y: auto;
}
</style>
