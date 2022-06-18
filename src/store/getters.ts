import { IGlobalState } from './index'

const getters = {
    userInfo: (state: IGlobalState) => state.auth.userInfo,
    order: (state: IGlobalState) => state.order,
    cacheInfo: (state: IGlobalState) => state.cacheInfo
}
export default getters