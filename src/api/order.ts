import request from "@src/request";


export function getOrderList(params: any) {
    return request.get({
        url:'/order', 
        params: params
    });
}




