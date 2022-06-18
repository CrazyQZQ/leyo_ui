import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import { IAuthState } from './modules/login/interface'
import { IOrderState } from './modules/order/interface'
import { ICacheState } from './modules/cache/interface'
import auth from './modules/login'
import order from './modules/order'
import cacheInfo from './modules/cache'

// 全局状态
export interface IGlobalState {
  auth: IAuthState,
  order: IOrderState,
  cacheInfo: ICacheState
}

const store = createStore<IGlobalState>({
  modules: {
    auth,
    order,
    cacheInfo
  },
  getters,
  plugins: [
    createPersistedState({
      reducer: (state) => ({
        auth: state.auth,
        order: state.order,
        cacheInfo: state.cacheInfo
      })
    })
  ]
})

export default store