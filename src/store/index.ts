import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import { IAuthState } from './modules/login/interface'
import { IOrderState } from './modules/order/interface'
import { ICacheState } from './modules/cache/interface'
import { ISocketState } from './modules/websocket/interface'
import auth from './modules/login'
import order from './modules/order'
import cacheInfo from './modules/cache'
import websocket from './modules/websocket'

// 全局状态
export interface IGlobalState {
  auth: IAuthState,
  order: IOrderState,
  cacheInfo: ICacheState,
  websocket: ISocketState
}

const store = createStore<IGlobalState>({
  modules: {
    auth,
    order,
    cacheInfo,
    websocket
  },
  getters,
  plugins: [
    createPersistedState({
      reducer: (state) => ({
        auth: state.auth,
        order: state.order,
        cacheInfo: state.cacheInfo,
        websocket: state.websocket
      })
    })
  ]
})

export default store