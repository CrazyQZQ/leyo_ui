import {Module} from 'vuex'
import {IGlobalState} from '@src/store/index'
import {IOrderState} from '@src/store/modules/order/interface'
import * as Types from '@src/store/modules/order/types'

const state: IOrderState = {
    order: {
        totalAmount: 0,
        orderDetailList: []
    },
    orderDetailList: [],
    cartIds: [],
    accountId: 0
}

const order: Module<IOrderState, IGlobalState> = {
    namespaced: true,
    state,
    mutations: {
        [Types.CAHCE_ORDER_INFO](state, data) {
            state.order = data.order
            state.orderDetailList = data.orderDetailList
            state.cartIds = data.cartIds
            state.accountId = data.accountId
        }
    },
    actions: {
        async [Types.CAHCE_ORDER_INFO]({commit}, data) {
            return commit(Types.CAHCE_ORDER_INFO, data)
        }
    }
}

export default order
