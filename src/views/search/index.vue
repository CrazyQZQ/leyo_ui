<template>
  <div class="search-box">
<!--    搜索框-->
    <van-row>
      <form action="/">
        <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel"/>
      </form>
    </van-row>
    <section>
<!--      搜索历史-->
      <van-row>

      </van-row>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted, computed} from 'vue'
import {useRouter} from 'vue-router';
import {IGlobalState} from '@src/store'
import {useStore} from 'vuex'
import {saveOrder} from '@src/api/order'
import {IOrderState} from '@src/store/modules/order/interface';


export default {
  name: 'SubmitOrder',
  components: {},
  setup() {
    const router = useRouter()


    return {};
  }
}
</script>
