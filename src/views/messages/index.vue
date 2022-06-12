<template>
  <div class="messages-box">
    <van-nav-bar title="消息" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="messages-body">

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { reactive, toRefs, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { UserAddress } from "@src/models/User";
import { BaseResponseType } from "@src/models/common";
import { queryUserAddress } from '@src/api/user'
import { useStore } from 'vuex'
import { IGlobalState } from '@src/store'

export default {
  name: 'Address',
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
.messages-box {
  padding: 0.5rem;
  background-color: #fff;
}
</style>
