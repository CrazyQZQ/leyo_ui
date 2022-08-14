/**
 * 公用返回类型
 */
export interface BaseResponseType<T> {
    code: number;
    msg: string;
    data: any;
}
/**
 * 搜索条件
 */
export interface SearchParams {
    highlight: boolean;
    highlightField: string[];
    indexName: string;
    queryVos: SearchItem[];
    page: number;
    rows: number;
    sortIndex: string;
    sortOrder: string;
}
/**
 * 搜索条件单元
 */
export interface SearchItem {
    field: string;
    keyword?: string;
    queryType: string;
    gte?: string;
    lte?: string;
}




