import { Module } from 'vuex'
import { IGlobalState } from '@src/store/index'
import { ISocketState } from '@src/store/modules/websocket/interface'
import * as Types from '@src/store/modules/order/types'
import main from '@src/main'

const state: ISocketState = {
    // 连接状态
    isConnected: false,
    // 消息内容
    message: "",
    // 重新连接错误
    reconnectError: false,
    // 心跳消息发送时间
    heartBeatInterval: 50000,
    // 心跳定时器
    heartBeatTimer: 0
}

const order: Module<ISocketState, IGlobalState> = {
    namespaced: true,
    state,
    mutations: {
        [Types.CAHCE_ORDER_INFO](state, data) {
            
        },
        // 连接打开
        SOCKET_ONOPEN(state, event) {
            main.config.globalProperties.$socket = event.currentTarget;
            state.isConnected = true;
            // 连接成功时启动定时发送心跳消息，避免被服务器断开连接
            state.heartBeatTimer = window.setInterval(() => {
                const message = "心跳消息";
                state.isConnected &&
                    main.config.globalProperties.$socket.sendObj({
                        code: 200,
                        msg: message
                    });
            }, state.heartBeatInterval);
        },
        // 连接关闭
        SOCKET_ONCLOSE(state, event) {
            state.isConnected = false;
            // 连接关闭时停掉心跳消息
            clearInterval(state.heartBeatTimer);
            state.heartBeatTimer = 0;
            console.log("连接已断开: " + new Date());
            console.log(event);
        },
        // 发生错误
        SOCKET_ONERROR(state, event) {
            console.error(state, event);
        },
        // 收到服务端发送的消息
        SOCKET_ONMESSAGE(state, message) {
            state.message = message;
        },
        // 自动重连
        SOCKET_RECONNECT(state, count) {
            console.info("消息系统重连中...", state, count);
        },
        // 重连错误
        SOCKET_RECONNECT_ERROR(state) {
            state.reconnectError = true;
        },
    },
    actions: {
        async [Types.CAHCE_ORDER_INFO]({ commit }, data) {
            return commit(Types.CAHCE_ORDER_INFO, data)
        }
    }
}

export default order
