import { Sku } from "./product";
import { UserAddress } from "./user";

// 订单
export interface Order {
    id?: number;
    number?: string;
    userId?: number;
    totalAmount: number;
    totalCount?: number;
    status?: number;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
    addressName?: string;
    address?: UserAddress;
    orderDetailList: OrderDetail[];
}

// 订单详情
export interface OrderDetail {
    id?: number;
    skuId: number;
    productName: string;
    masterId?: number;
    count?: number;
    amount?: number;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
    sku: Sku;
}