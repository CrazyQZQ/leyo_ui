import {Module} from 'vuex'
import {IGlobalState} from '@src/store/index'
import {ICacheState} from './interface'
import * as Types from './types'

const state: ICacheState = {
    searchHistory: [],
}

const cacheInfo: Module<IOrderState, IGlobalState> = {
    namespaced: true,
    state,
    mutations: {
        [Types.ADD_SEARCH_HISTORY](state, data: string) {
            if (state.searchHistory.indexOf(data) === -1) {
                if (state.searchHistory.length >= 10) {
                    state.searchHistory.pop()
                }
                state.searchHistory.push(data)
            }
        },
        [Types.DELETE_SEARCH_HISTORY](state, data: number) {
            state.searchHistory.splice(data, 1)
        },
        [Types.CLEAR_SEARCH_HISTORY](state, data) {
            state.searchHistory.length = 0
        }
    },
    actions: {
        async [Types.ADD_SEARCH_HISTORY]({commit}, data: string) {
            return commit(Types.ADD_SEARCH_HISTORY, data)
        },
        async [Types.DELETE_SEARCH_HISTORY]({commit}, data: number) {
            return commit(Types.DELETE_SEARCH_HISTORY, data)
        },
        async [Types.CLEAR_SEARCH_HISTORY]({commit}, data) {
            return commit(Types.CLEAR_SEARCH_HISTORY, data)
        }
    }
}

export default cacheInfo
