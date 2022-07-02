import { User,Token } from '@src/models/User'

/**
 * 用户信息
 */
export interface IAuthState {
  userInfo: User
  token: Token
  isAuth: boolean
}