
import request from "@src/request";

export function login(params: any) {
    request.post({
        url: '/system/client_login',
        data: params,
        headers: {'Content-Type': 'application/json'}
    })
    
}