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
  selectedUserAddressId: -1
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
    },
    [Types.SELECT_ADDRESS](state, data: number) {
      state.selectedUserAddressId = data
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
    },
    async [Types.SELECT_ADDRESS]({commit}, data: number) {
      return commit(Types.SELECT_ADDRESS, data)
    }
  }
}

export default login
