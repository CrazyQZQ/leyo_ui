import { Module } from 'vuex'
import { IGlobalState } from '@src/store/index'
import { IAuthState } from '@src/store/modules/login/interface'
import * as Types from '@src/store/modules/login/types'

const state: IAuthState = {
  userInfo: {
    userId: 0,
    userName: '',
    nickName: '',
    email: '',
    phoneNumber: '',
    sex: '',
    avatar: ''
  },
  token: {},
  isAuth: false
}

const login: Module<IAuthState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.SAVE_USER_INFO](state, data) {
      state.userInfo = data
      state.isAuth = true
    },
    [Types.SAVE_TOKEN](state, data) {
      state.token = data
    },
    [Types.LOGOUT](state, data) {
      state.userInfo = {
        userId: 0,
        userName: '',
        nickName: '',
        email: '',
        phoneNumber: '',
        sex: '',
        avatar: ''
      }
      state.token = {}
      state.isAuth = false
    }
  },
  actions: {
    async [Types.SAVE_USER_INFO]({ commit }, data) {
      return commit(Types.SAVE_USER_INFO, data)
    },
    async [Types.SAVE_TOKEN]({ commit }, data) {
      return commit(Types.SAVE_TOKEN, data)
    },
    async [Types.LOGOUT]({ commit }, data) {
      return commit(Types.LOGOUT, data)
    }
  }
}

export default login
