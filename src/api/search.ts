import request from "@src/request";
import { SearchParams } from "@src/models/common";

/**
 * 查询列表
 * @param params
 */
export const search = (params: SearchParams) => {
    return request.post({
        url: '/search/list',
        data: params,
        headers: {'Content-Type': 'application/json'}
    })
}