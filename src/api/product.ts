import request from "@src/request";


export function typeTree() {
    request.post({
        url: '/product/type/list',
        headers: {'Content-Type': 'application/from-data'}
    })
}

export function brandTree() {
    request.post({
        url: '/product/brand/list',
        headers: {'Content-Type': 'application/from-data'}
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






