import { User,Token } from '@src/models/user'

/**
 * 用户信息
 */
export interface IAuthState {
  userInfo: User
  token: Token
  isAuth: boolean
  selectedUserAddressId: Number
}