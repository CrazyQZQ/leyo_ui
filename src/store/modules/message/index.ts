import {Module} from 'vuex'
import {IGlobalState} from '@src/store/index'
import {IMessageState} from './interface'
import { MessageInfo } from '@src/models/common'
import * as Types from './types'

const state: IMessageState = {
    // 消息类型 0：系统消息
    massageMap: {
        '0': null,
    },
    total: 0
}

const messageInfo: Module<IMessageState, IGlobalState> = {
    namespaced: true,
    state,
    mutations: {
        [Types.RECEIVE_MESSAGE](state, data: MessageInfo) {
            let msg = state.massageMap[data.type] as MessageInfo
            if (msg) {
                msg.message = data.message
                msg.count += 1
            }else {
                data.count = 1
                state.massageMap[data.type] = data
            }
            state.total += 1
        },
        [Types.READ_MESSAGE](state, data: string) {
            let msg = state.massageMap[data] as MessageInfo
            console.log(msg, data)
            if (msg) {
                msg.count -= 1
            }
            state.total -= 1
        }
    },
    actions: {
        async [Types.RECEIVE_MESSAGE]({commit}, data: MessageInfo) {
            return commit(Types.RECEIVE_MESSAGE, data)
        },
        async [Types.READ_MESSAGE]({commit}, data: string) {
            return commit(Types.READ_MESSAGE, data)
        }
    }
}

export default messageInfo
