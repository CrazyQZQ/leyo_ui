<template>
  <div className="h-screen bg-gray-100 relative">
    <van-nav-bar title="个人资料" left-arrow @click-left="$router.go(-1)"/>
    <div class="text-center py-2">
      <van-image class="border-2 border-dotted" round width="5rem" height="5rem" :src="userInfo.avatar" @click="viewAvatar = true"/>
    </div>
    <van-cell-group inset>
      <van-cell is-link>
        <template #title>
          昵称：{{userInfo.nickName}}
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          登录名：{{ userInfo.userName }}
        </template>
      </van-cell>
      <van-cell is-link>
        <template #title>
          手机号：{{ userInfo.phoneNumber }}
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue'
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
    const userInfo = computed(() => {
      return store.state.auth.userInfo
    })

    const goTo = (r: string, query: any) => {
      router.push({path: r, query: query || {}})
    }
    return {
      show,
      goTo,
      userInfo
    }
  }
})
</script>
