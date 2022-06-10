import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import { IAuthState } from './modules/login/interface'
import { IOrderState } from './modules/order/interface'
import auth from './modules/login'
import order from './modules/order'
// 全局状态
export interface IGlobalState {
  auth: IAuthState,
  order: IOrderState
}

const store = createStore<IGlobalState>({
  modules: {
    auth,
    order
  },
  getters,
  plugins: [
    createPersistedState({
      // storage: window.sessionStorage,
      reducer: (state) => ({
        auth: state.auth,
        order: state.order
      })
    })
  ]
})

export default store