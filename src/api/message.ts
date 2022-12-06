import request from "@src/request";

/**
 * 查询用户消息列表
 * @param params
 * @returns
 */
export const getMessageList = (params: object) => {
    return request.get({
        url: '/system/message/list',
        params: params,
    })
}

/**
 * 已读消息
 * @param params
 * @returns
 */
export const readMessage = (params: object) => {
    return request.get({
        url: '/system/message/readMessage',
        params: params,
    })
}

/**
 * 删除消息
 * @param params
 */
export const searchProduct = (params: Array) => {
    return request.post({
        url: '/system/message/deleteMessage',
        data: params,
        headers: {'Content-Type': 'application/json'}
    })
}