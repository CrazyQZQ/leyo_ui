import { IGlobalState } from './index'

const getters = {
    userInfo: (state: IGlobalState) => state.auth.userInfo,
    isAuth: (state: IGlobalState) => state.auth.isAuth,
    order: (state: IGlobalState) => state.order,
    cacheInfo: (state: IGlobalState) => state.cacheInfo,
    websocket: (state: IGlobalState) => state.websocket,
    messageInfo: (state: IGlobalState) => state.messageInfo,
}
export default getters