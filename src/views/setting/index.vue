<template>
  <div className="h-screen bg-gray-100 relative">
    <van-nav-bar title="设置" left-arrow @click-left="$router.go(-1)"/>
    <section class="my-1 h-5/6">
      <van-cell is-link @click="goTo('/userInfoSetting', {})">个人资料</van-cell>
      <van-cell is-link @click="goTo('/address', {})">地址管理</van-cell>
    </section>
    <!--    <van-popup v-model:show="show" position="top" :style="{ height: '30%' }" />-->
    <van-button round type="danger" block @click="logout">
      退出登录
    </van-button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import * as Types from '@src/store/modules/login/types'
import {IGlobalState} from '@src/store'
import {Dialog} from 'vant';

export default defineComponent({
  name: 'Setting',
  setup() {
    const store = useStore<IGlobalState>()
    const router = useRouter()
    const show = ref(false);
    const logout = async () => {
      Dialog.alert({
        title: '退出登录',
        message: '是否退出登录？',
        showCancelButton: true,
        closeOnClickOverlay: true
      }).then(() => {
        store.dispatch(`auth/${Types.LOGOUT}`, {})
        router.replace({
          name: 'Login'
        })
      });
    }
    const goTo = (r: string, query: any) => {
      router.push({path: r, query: query || {}})
    }
    return {
      logout,
      show,
      goTo
    }
  }
})
</script>
