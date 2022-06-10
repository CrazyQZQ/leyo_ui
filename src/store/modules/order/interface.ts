import { Order,OrderDetail } from '@src/models'

/**
 * 订单信息
 */
export interface IOrderState {
  order: Order
  orderDetailList: Array<OrderDetail>
  cartIds: Array<number>
  accountId: number
}