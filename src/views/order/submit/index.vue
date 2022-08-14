<template>
  <div class="h-screen submit-order-body">
    <van-nav-bar title="提交订单" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="h-full px-2">
      <!-- address -->
      <div class="rounded-lg border-gray-300 shadow">
        <van-cell-group inset size="small">
          <van-cell :title="curAddress?'收货地址':'选择收货地址'">
            <template #right-icon v-if="curAddress">
              <span @click="$router.push('/address')">切换地址</span>
            </template>
            <template #label v-if="curAddress">
              <van-row class="h-6 align-middle leading-8">收件人：{{curAddress.receiverName}}</van-row>
              <van-row class="h-6 align-middle leading-8">手机号：{{curAddress.receiverTel}}</van-row>
              <van-row class="h-6 align-middle leading-8">地址：{{curAddress.fullAddress}}</van-row>
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
      <pay-type @payTypeChange="changePayType"></pay-type>
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
import { UserAddress, SysAccount } from "@src/models/user";
import PayType from '@src/components/payType.vue'
import { BaseResponseType } from '@src/models/common'
import { Toast } from "vant";


export default {
  name: 'SubmitOrder',
  components: {
    PayType
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore<IGlobalState>()
    let selectedAccount: Ref<SysAccount> = ref({
      accountId: null,
      userId: null,
      accountCode: '',
      accountName: '',
      amount: 0
    })

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
    const submit = async () => {
      Toast.loading('加载中...')
      let params = JSON.parse(JSON.stringify(store.state.order))
      params.order.userAddressId = curAddress.value.id
      params.order.userId = store.state.auth.userInfo.userId
      params.accountId = selectedAccount.value.accountId
      const { code, data } = await saveOrder(params) as BaseResponseType<number>
      // Toast.clear()
      if (code == 200) {
        Toast.success('支付成功')
        router.push(`orderDetail?orderId=${data}`)
      }
    }

    const changePayType = (val: SysAccount) => {
      selectedAccount.value = val
    }

    return {
      goBack,
      submit,
      orderInfo,
      curAddress,
      changePayType,
    };
  }
}
</script>
<style lang="less" scoped>

//.order-list {
//  height: calc(100% - 13.5rem);
//  overflow-y: auto;
//}
</style>
