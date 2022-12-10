import { MessageInfo } from '@src/models/common'
/**
 * 消息类型
 */
export interface IMessageState {
  /**
   * 消息类型 -> 各类型最新消息
   */
  massageMap: object;
  total: number;
}