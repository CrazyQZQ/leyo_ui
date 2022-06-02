import request from "@src/request";

/**
 * 获取订单列表
 * @param params
 */
export const getOrderList = (params: object) => {
    return request.get({
        url:'/order', 
        params: params
    });
}

/**
 * 获取购物车列表
 * @returns
 */
export const getShopingCartItems = (params: object) => {
    return request.get({
        url: '/order/cart/list',
        params: params
    })
}

/**
 * 添加购物车
 * @param params
 */
export const addCartItem = (params: object) => {
    return request.put({
        url: '/order/cart/add',
        data: params,
        headers: { 'Content-Type': 'application/json' }
    })
}

/**
 * 修改购物车商品数量
 * @param params
 */
export const updateCartItemNum = (params: object) => {
    return request.post({
        url: '/order/cart/update',
        params: params
    })
}

/**
 * 删除购物车商品
 * @param params
 */
export const deleteCartItem = (params: object) => {
    return request.delete({
        url: '/order/cart/delete',
        params: params
    })
}




