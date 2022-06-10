import { User } from '@src/models'
import { IGlobalState } from './index'

const getters = {
    userInfo: (state: IGlobalState) => state.auth.userInfo,
    order: (state: IGlobalState) => state.order
}
export default getters