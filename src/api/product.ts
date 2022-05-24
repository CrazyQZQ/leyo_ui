import request from "@src/request";

/**
 * 查询品类列表
 * @returns
 */
export function typeList() {
    request.post({
        url: '/product/type/list',
        params: {parentId: 0}
    })
}

/**
 * 查询品类数
 * @returns
 */
export function typeTree() {
    request.get({
        url: '/product/type/tree'
    })
}

/**
 * 查询品牌列表
 * @returns
 */
export function brandList() {
    request.post({
        url: '/product/brand/list',
        params: {parentId: 0}
    })
}

/**
 * 查询品牌数
 * @returns
 */
export function brandTree() {
    request.post({
        url: '/product/brand/tree',
    })
}

export function productList(params: any) {
    request.post({
        url: '/product/list',
        params: params,
        headers: {'Content-Type': 'application/from-data'}
    })
}

export function productInfo(params: any) {
    request.get({
        url: '/product/info',
        params: params
    })
}






