<template>
  <div class="order-detail-box">
    <van-nav-bar title="提交订单" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="order-detail-body">

    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'ShoppingCart',
  components: {
  },
  setup() {
    const router = useRouter()
    const goBack = () => {
      router.go(-1)
    }


    return {
      goBack
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
