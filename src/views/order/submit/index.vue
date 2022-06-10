<template>
  <div class="order-detail-box">
    <van-nav-bar title="提交订单" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="order-detail-body">
      <van-button type="danger" @click="submit">危险按钮</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, PropType, toRef, onMounted} from 'vue'
import { useRouter } from 'vue-router';
import {IGlobalState} from '@src/store'
import {useStore} from 'vuex'
import { saveOrder } from '@src/api/order.ts'

export default {
  name: 'SubmitOrder',
  components: {
  },
  setup() {
    const router = useRouter()
    const store = useStore<IGlobalState>()
    const goBack = () => {
      router.go(-1)
    }

    onMounted(() => {
      console.log(store.state.order)
    })

    const submit = () => {
      let params = JSON.parse(JSON.stringify(store.state.order))
      params.order.userAddressId = 3
      params.order.userId = store.state.auth.userInfo.userId
      params.accountId = 1
      saveOrder(params).then(res => {
        console.log(res)
      })
    }

    return {
      goBack,
      submit
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
