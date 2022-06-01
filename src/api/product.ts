import request from "@src/request";

/**
 * 查询品类列表
 * @returns
 */
export const typeList = (params: object) => {
    return request.get({
        url: '/product/type/list',
        params: params
    })
}

/**
 * 查询品类数
 * @returns
 */
export const typeTree = () => {
    return request.get({
        url: '/product/type/tree'
    })
}

/**
 * 查询品牌列表
 * @returns
 */
export const brandList = (params: object) => {
    return request.get({
        url: '/product/brand/list',
        params: params
    })
}

/**
 * 查询品牌数
 * @returns
 */
export const brandTree = () => {
    return request.get({
        url: '/product/brand/tree',
    })
}

/**
 * 查询商品列表
 * @param params 
 */
export const productList = (params: any) => {
    return request.get({
        url: '/product/list',
        params: params
    })
}

/**
 * 查询商品详情
 * @param params 
 */
export const productInfo = (params: any) => {
    return request.get({
        url: '/product/info',
        params: params
    })
}

/**
 * 查询sku列表
 * @returns
 */
export const getSkuList = (params: object) => {
    return request.get({
        url: '/product/sku/list',
        params: params
    })
}