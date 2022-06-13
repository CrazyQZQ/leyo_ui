import { Sku } from "./product";

// 订单
export interface Order {
    id?: number;
    number?: string;
    userId?: number;
    totalAmount?: number;
    totalCount?: number;
    status?: number;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
}

// 订单详情
export interface OrderDetail {
    skuId?: number;
    count?: number;
    amount?: number;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
    sku?: Sku;
}