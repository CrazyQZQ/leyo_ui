import {Module} from 'vuex'
import {IGlobalState} from '@src/store/index'
import {ICacheState} from './interface'
import * as Types from './types'

const state: ICacheState = {
    searchHistory: [],
    loading: false
}

const cacheInfo: Module<ICacheState, IGlobalState> = {
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
        },
        [Types.TOGGLE_LOADING](state, data: boolean) {
            state.loading = data
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
        ,
        async [Types.TOGGLE_LOADING]({commit}, data: boolean) {
            return commit(Types.TOGGLE_LOADING, data)
        }
    }
}

export default cacheInfo
