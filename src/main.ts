import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import { useVant } from './util'
import store from './store'
import socket from './util/socket'
// import VueNativeSock from "vue-native-websocket-vue3";

const app = useVant(createApp(App))
app.provide('socket', socket)
app.use(store)
  .use(router)
  .mount('#app')
// // 使用VueNativeSock插件，并进行相关配置
// app.use(
//   VueNativeSock,
//   `ws://117.50.187.26:8700/system/websocket/endpoint/1`,
//   {
//     // 启用Vuex集成
//     store: store,
//     // 数据发送/接收使用使用json
//     format: "json",
//     // 开启手动调用 connect() 连接服务器
//     connectManually: true,
//     // 开启自动重连
//     reconnection: true,
//     // 尝试重连的次数
//     reconnectionAttempts: 5,
//     // 重连间隔时间
//     reconnectionDelay: 3000
//   }
// )

export default app;