<template>
  <div class="bg-gray-100 user-box">
    <div class="h-40 w-full bg-purple-500 rounded-b-6xl"></div>
    <section class="w-full flex justify-center px-4 -mt-16">
      <div class="h-40 w-full bg-white rounded-lg">
        <van-skeleton title :avatar="true" :row="3" :loading="loading">
          <div class="user-info">
            <div class="info">
              <img class="h-25 w-25" :src="userInfo.avatar" />
              <div class="user-desc">
                <span>昵称：{{ userInfo.nickName }}</span>
                <span>登录名：{{ userInfo.userName }}</span>
                <span>手机号：{{ userInfo.phoneNumber }}</span>
              </div>
            </div>
          </div>
        </van-skeleton>
      </div>
    </section>
    <div>
      <ul class="user-list">
          <li class="van-hairline--bottom" @click="goTo('/order', {})">
            <span>我的订单</span>
            <van-icon name="arrow" />
          </li>
          <li class="van-hairline--bottom" @click="goTo('/setting', {})">
            <span>账号管理</span>
            <van-icon name="arrow" />
          </li>
          <li class="van-hairline--bottom" @click="goTo('/address', { from: 'mine' })">
            <span>地址管理</span>
            <van-icon name="arrow" />
          </li>
          <li @click="goTo('/about', {})">
            <span>关于我们</span>
            <van-icon name="arrow" />
          </li>
        </ul>
        <nav-bar></nav-bar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import useStore from '@src/store/home'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'me',

  setup() {
    const loading = false
    const router = useRouter()
    const [userInfo, getHomeData] = useStore((state) => [
      state.userInfo,
      state.getHomeData
    ])
    onMounted(() => {
      getHomeData()
    })
    const goBack = () => {
      router.go(-1)
    }

    const goTo = (r: string, query: any) => {
      router.push({ path: r, query: query || {} })
    }
    return {
      userInfo,
      loading,
      goBack,
      goTo
    }
  }
})
</script>
<style lang="less" scoped>
@import '@src/common/style/mixin';

.user-box {
  .user-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;

    .user-name {
      font-size: 14px;
    }
  }

  .user-info {
    width: 94%;
    margin: 10px;
    height: 115px;
    background: linear-gradient(90deg, @primary, #51c7c7);
    box-shadow: 0 2px 5px #269090;
    border-radius: 6px;

    .info {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      padding: 25px 20px;
      .boxSizing();

      img {
        .wh(60px, 60px);
        border-radius: 50%;
        margin-top: 4px;
      }

      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;

        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }

      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;

        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }

  .user-list {
    padding: 0 20px;
    margin-top: 20px;

    li {
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;

      .van-icon-arrow {
        margin-top: 13px;
      }
    }
  }
}
</style>
