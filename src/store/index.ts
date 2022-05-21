import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import { IAuthState } from './modules/login/interface'
import auth from './modules/login'
// 全局状态
export interface IGlobalState {
  auth: IAuthState
}

const store = createStore<IGlobalState>({
  modules: {
    auth
  },
  getters,
  plugins: [
    createPersistedState({
      // storage: window.sessionStorage,
      reducer: (state) => ({
        auth: state.auth
      })
    })
  ]
})

export default store