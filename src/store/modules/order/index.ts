import {Module} from 'vuex'
import {IGlobalState} from '@src/store/index'
import {IOrderState} from '@src/store/modules/order/interface'
import * as Types from '@src/store/modules/order/types'

const state: IOrderState = {
    order: {
        id: 0,
			orderStatus: -1,
			number: '',
			userId: 0,
			totalAmount: 0,
			totalCount: 0,
			status: 0,
			createTime: '',
			address: {
				userId: 0,
				receiverName: '',
				receiverTel: '',
				defaultStatus: 0,
				postCode: '',
				province: '',
				city: '',
				region: '',
				areaCode: '',
				detailAddress: '',
				fullAddress: ''
			},
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
