<template>
  <div class="order-detail-box">
    <van-nav-bar title="订单详情" left-arrow @click-left="goBack"></van-nav-bar>
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
    const chosenAddressId = ref('1');
    const list = [
      {
        id: '1',
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
      },
      {
        id: '2',
        name: '李四',
        tel: '1310000000',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
      },
    ];
    const disabledList = [
      {
        id: '3',
        name: '王五',
        tel: '1320000000',
        address: '浙江省杭州市滨江区江南大道 15 号',
      },
    ];

    const onAdd = () => Toast('新增地址');
    const onEdit = (item, index) => Toast('编辑地址:' + index);

    return {
      goBack,
      list,
      onAdd,
      onEdit,
      disabledList,
      chosenAddressId,
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
