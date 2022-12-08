<template :class="isDark ? 'dark' : ''">
	<div style="overflow-y: hidden; overflow-x: hidden" class="h-full">
		<!-- vue3.0不能采用种形式来实现，否则要报错，路由跳转动画也无法实现 -->
		<!-- <transition name="slide-left">
      <router-view></router-view>
		</transition>-->
		<!-- vue3.0必须以这种形式来实现 -->
		<router-view v-slot="{ Component }">
			<!--      <transition name="slide-fade" mode="out-in" :duration="{ enter: 500, leave: 300 }">-->
			<component :is="Component" />
			<!--      </transition>-->
		</router-view>
		<router-view name="Tabbar"></router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue'
import { useDark } from '@vueuse/core'
import { onBeforeRouteUpdate } from 'vue-router'
import { Notify, NotifyType } from 'vant'
import { WsMessage } from '@src/models/common'
import { useStore } from 'vuex'
import { IGlobalState } from '@src/store'

export default defineComponent({
	name: 'App',
	setup() {
		const store = useStore<IGlobalState>()
		const pingMsg: WsMessage = {
			userId: 2,
			action: 'ping',
			body: '心跳消息',
			type: '0',
			notificationType: 'primary',
			redirectUrl: '',
			pushStatus: '0',
			readStatus: '0'
		}
		onMounted(() => {
			const userId = store.state.auth.userInfo.userId
			const socket: any = inject('socket')
			let ws = socket(2) as WebSocket
			ws.onmessage = (res: any) => {
				const { data } = res
				const responseMsg = JSON.parse(data) as WsMessage
				console.log('收到来自服务端的消息：', responseMsg)

				if (responseMsg.action !== 'pong') {
					Notify({
						message: responseMsg.body,
						type: responseMsg.notificationType
					})
				}
			}
			ws.onopen = function () {
				console.log('WebSocket:已连接')
				//心跳检测重置
				if (userId) {
					heartCheck.reset().start()
				}
			}
			//连接发生错误的回调方法
			ws.onerror = function () {
				console.log('WebSocket:发生错误')
				ws = socket(2)
			}
			var heartCheck = {
				timeout: 5000,
				timeoutObj: setTimeout(() => {}),
				serverTimeoutObj: setInterval(() => {}),
				reset: function () {
					clearTimeout(this.timeoutObj)
					clearTimeout(this.serverTimeoutObj)
					return this
				},
				start: function () {
					var self = this
					clearTimeout(this.timeoutObj)
					clearTimeout(this.serverTimeoutObj)
					this.timeoutObj = setInterval(function () {
						//这里发送一个心跳，后端收到后，返回一个心跳消息，
						//onmessage拿到返回的心跳就说明连接正常
						if (ws) {
							console.log('ws.readyState, ws.CLOSED', ws.readyState, ws.CLOSED)
							ws.send(JSON.stringify(pingMsg))
							console.log('websocket发送心跳信息')
							// 如果超过一定时间还没重置，说明后端主动断开了
							// self.serverTimeoutObj = setTimeout(function () {
							// 	console.log('关闭服务')
							// 	//如果onclose会执行reconnect，我们执行 websocket.close()就行了.如果直接执行 reconnect 会触发onclose导致重连两次
							// 	if (ws) {
							// 		ws.close()
							// 	}
							// }, self.timeout)
						}
					}, this.timeout)
				}
			}
		})
		const isDark = useDark({
			valueDark: 'dark',
			valueLight: 'light'
		})

		const animation = ref('')
		onBeforeRouteUpdate((to, form) => {
			// if (to.meta.index > form.meta.index) {
			//   animation.value = 'slide-left'
			// } else {
			//   animation.value = 'slide-right'
			// }
		})
		return {
			isDark,
			animation
		}
	}
})
</script>

