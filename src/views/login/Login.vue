<template>
	<div
		className="container mx-auto overflow-x-hidden overflow-y-hidden h-screen bg-white dark:bg-gray-800 flex flex-col">
		<!-- head logo -->
		<div class="flex flex-col justify-center items-center">
			<div class="w-22 h-22">
				<img :src="logoUrl" alt="airi logo" />
			</div>
		</div>
		<!-- middle input -->
		<div class="container w-full flex flex-col justify-center items-center">
			<div class="w-10/12 rounded-lg py-3 px-6 flex flex-row bg-gray-100">
				<img src="../../assets/images/login/phone.png" alt="phone" class="w-6 pr-2" />
				<input type="text" class="w-full focus:outline-none bg-gray-100" v-model="userName"
					placeholder="请输入用户名" />
			</div>
			<div class="w-10/12 rounded-lg py-3 px-6 flex flex-row bg-gray-100 mt-4">
				<img src="../../assets/images/login/password.png" alt="phone" class="w-7 pr-2" />
				<input type="password" class="w-full focus:outline-none bg-gray-100" v-model="passWord"
					placeholder="请输入密码" />
			</div>
		</div>
		<!-- submit button -->
    <van-row class="mt-8 w-10/12 h-14 self-center" justify="center">
      <van-button round type="danger" block color="#ff770f" @click="doLogin">登录</van-button>
    </van-row>
		<div class="flex flex-row justify-center items-center mt-8 divide-x divide-gray-300">
			<p class="pr-5 text-gray-400 text-sm">找回密码</p>
			<p class="pl-5 text-gray-800 text-sm">新用户注册</p>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import logoUrl from '@assets/logo.png'
import { Notify } from 'vant'
import { useRouter } from 'vue-router'
import { login } from '@src/api/user'
import { useStore } from 'vuex'
import * as Types from '@src/store/modules/login/types'
import { IGlobalState } from '@src/store'

export default defineComponent({
	name: 'Login',
	setup() {
		const store = useStore<IGlobalState>()
		const userName = ref('')
		const passWord = ref('')
		const route = useRouter()
		const doLogin = async () => {
			if (userName.value === '') {
				Notify({
					type: 'warning',
					message: '用户名不能为空',
					color: '#fff',
					background: '#a78bfa'
				})
				return
			}
			if (passWord.value === '') {
				Notify({
					type: 'warning',
					message: '密码不能为空',
					color: '#fff',
					background: '#a78bfa'
				})
				return
			}
			const res: any = await login({
				username: userName.value,
				password: passWord.value
			})
			if(res && res.code === 200){
				store.dispatch(`auth/${Types.SAVE_USER_INFO}`, res.data.user)
				store.dispatch(`auth/${Types.SAVE_TOKEN}`, res.data.token)
				route.replace({
					name: 'Home'
				})
			}
		}

		return {
			logoUrl,
			userName,
			passWord,
			doLogin,
		}
	}
})
</script>
<style lang="less" scoped>

.submit-btn {
  background-color: #ff770f;
}
</style>