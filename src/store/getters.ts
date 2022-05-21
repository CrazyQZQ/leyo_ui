import { User } from '@src/models'
import { IGlobalState } from './index'

const getters = {
    userInfo: (state: IGlobalState) => state.auth.userInfo
}
export default getters