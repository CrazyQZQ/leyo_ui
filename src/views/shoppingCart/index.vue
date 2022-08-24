<template>
  <div class="cart-box">
    <van-nav-bar title="购物车"></van-nav-bar>
    <div class="cart-body">
      <van-swipe-cell stop-propagation v-for="(item, index) in cartItems" :key="index">
        <van-checkbox v-model="item.checked" checked-color="#b4282d"></van-checkbox>
        <van-card :tag="item.sku ? item.sku.typeName : ''" :price="item.sku ? item.sku.price : ''"
          :desc="(item.sku ? item.sku.typeName : '') + '-' + (item.sku ? item.sku.brandName : '')"
          :title="item.sku ? item.sku.productName : ''" :thumb="item.sku ? item.sku.imageUrl : ''"
          :origin-price="item.sku ? item.sku.originalPrice : ''" class="goods-card">
          <template #tags>
            <van-tag plain type="danger" v-for="(addr, idx) in item.sku.skuAttributes" :key="idx">{{ addr.value }}
            </van-tag>
          </template>
          <template #footer>
            <van-stepper v-model="item.num" @change="numChange(item)" />
          </template>
        </van-card>
      </van-swipe-cell>
    </div>
    <van-submit-bar class="submit-bar" :price="totalPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="selectAll" @click="click" checked-color="#b4282d">全选</van-checkbox>
      <!-- <template #tip>
        你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
      </template> -->
    </van-submit-bar>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, ref, Ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getShopingCartItems, updateCartItemNum } from '@src/api/order'
import { IGlobalState } from '@src/store'
import { useStore } from 'vuex'
import * as Types from '@src/store/modules/order/types'
import { Toast } from 'vant';
import { ShoppingCartItem, SkuAttributes } from "@src/models/product";
import { Order, OrderDetail } from "@src/models/order";
import { BaseResponseType } from "@src/models/common";
import { toggle } from '@src/util/useToggle'

export default {
  name: 'ShoppingCart',
  components: {
  },
  setup() {
    const store = useStore<IGlobalState>()
    const router = useRouter()
    const state = reactive({
      status: '',
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      page: 1,
      totalPage: 0
    })

    let selectAll = ref(false)
    let totalPrice = ref(0)

    const goBack = () => {
      router.go(-1)
    }

    let cartItems: Ref<ShoppingCartItem[]> = ref([])
    onMounted(async () => {
      let userId = store.state.auth.userInfo.userId
      if (userId) {
        toggle(true)
        await getShopingCartItems({ userId: userId }).then(res => {
          let r = res as BaseResponseType<object>
          cartItems.value = r.data as ShoppingCartItem[]
        }).catch(err => {
          cartItems.value = []
        })
        toggle(false)
      }
    })
    const onSubmit = () => {
      let anySelected = cartItems.value.find(item => item.checked == true)
      if (!anySelected) {
        Toast.fail('请选择商品')
        return
      }
      let orderDetailList: OrderDetail[] = []
      let totalCount = 0
      let cartIds: number[] = []
      cartItems.value.forEach(item => {
        if (item && item.sku && item.checked && item.id) {
          totalCount += item.num || 0
          cartIds.push(item.id)
          orderDetailList.push({
            skuId: item.skuId || 0,
            productName: '',
            count: item.num,
            amount: (item.sku.price || 0) * (item.num || 0),
            sku: { ...item.sku }
          })
        }
      })
      let orderInfo = {
        order: {
          totalAmount: totalPrice.value / 100,
          totalCount: totalCount
        },
        orderDetailList: orderDetailList,
        cartIds: cartIds,
        accountId: 0
      }
      store.dispatch(`order/${Types.CAHCE_ORDER_INFO}`, orderInfo)
      router.push('/submitOrder')
    }
    const click = (event: MouseEvent) => {
      cartItems.value.forEach(item => {
        item.checked = selectAll.value
      })
    }

    const numChange = (item: ShoppingCartItem) => {
      if (item && item.num && item.sku && item.sku.stock && item.num > item.sku.stock) {
        Toast.fail('库存不足')
      }
      if (item && item.num && item.num < 1) {
        Toast.fail('数量不能小于1')
      }
      updateCartItemNum({ id: item.id, num: item.num })
    }

    const formatSpec = (attributes: Array<SkuAttributes>) => {
      let spec = ''
      attributes.forEach(item => {
        spec += `${item.name}:${item.value} `
      })
      return spec
    }

    watch(cartItems, (newValue, oldValue) => {
      let flag = true
      totalPrice.value = 0
      newValue?.forEach(item => {
        if (item && item.checked && item.sku) {
          totalPrice.value += (item.sku.price || 0) * (item.num || 0)
        } else {
          flag = false
        }
      })
      selectAll.value = flag
      totalPrice.value = totalPrice.value * 100
    }, { deep: true })

    return {
      ...toRefs(state),
      goBack,
      cartItems,
      onSubmit,
      selectAll,
      numChange,
      click,
      formatSpec,
      totalPrice
    }
  }
}
</script>
<style lang="less" scoped>
.cart-box {
  padding: 0.5rem;
  background-color: #fff;

  .cart-body {
    padding: 0.5rem;

    .van-checkbox {
      position: absolute;
      top: 41%;
      margin-top: -10px;
      left: 3px;
      z-index: 99999;
    }

    .goods-card {
      margin: 0;
      // background-color: $bagColor;
      padding: 4px 4px 3px 27px;

      .van-card__header {
        margin-left: 8px;
      }
    }
  }

  .submit-bar {
    bottom: 54px;
  }
}
</style>
