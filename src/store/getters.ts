import { IGlobalState } from './index'

const getters = {
    userInfo: (state: IGlobalState) => state.auth.userInfo,
    isAuth: (state: IGlobalState) => state.auth.isAuth,
    order: (state: IGlobalState) => state.order,
    cacheInfo: (state: IGlobalState) => state.cacheInfo
}
export default getters