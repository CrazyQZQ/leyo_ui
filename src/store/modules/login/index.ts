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
  isAuth: false,
  code: ''
}

const login: Module<IAuthState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.SAVE_USER_INFO](state, data) {
      state.userInfo = data
    },
    [Types.SAVE_TOKEN](state, data) {
      state.token = data
    },
    ['STE_ISAUTH'](state, data) {
      state.isAuth = data
    },
    ['STE_CODE'](state, data) {
      state.code = data
    }
  },
  actions: {
    async [Types.SAVE_USER_INFO]({ commit }, data) {
      return commit(Types.SAVE_USER_INFO, data)
    },
    async [Types.SAVE_TOKEN]({ commit }, data) {
      return commit(Types.SAVE_TOKEN, data)
    },
    async ['STE_ISAUTH']({ commit }, data) {
      return commit('STE_ISAUTH', data)
    },
    async ['STE_CODE']({ commit }, data) {
      return commit('STE_CODE', data)
    }
  }
}

export default login
