export interface BaseResponseType {
    code: number;
    msg: string;
    data?: any;
    total?: number;
    rows?: Array<any>;
}

// 账户
export interface Account {
    accountId: number;
    accountCode: number;
    accountName: string;
    amount: number;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
}

// 地区
export interface AreaInfo {
    id: number;
    parentId: number;
    code: string;
    name: string;
    level: number;
}

// 品牌
export interface Brand {
    id: number;
    parentId: number;
    name: string;
    typeId: number;
    orderNum: number;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    imageUrls: string[];
}

// 部门
export interface Dept {
    deptId: number;
    parentId: number;
    ancestors: string;
    deptName: string;
    orderNum: number;
    leader: string;
    phone: string;
    email: string;
    status: string;
    delFlag: string;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
}

// 菜单
export interface Menu {
    menuId: number;
    menuName: string;
    parentId: number;
    orderNum: number;
    path: string;
    component: string;
    query: string;
    isFrame: number;
    isCache: number;
    menuType: string;
    visible: string;
    status: string;
    perms: string;
    icon: string;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    remark: string;
}

// 订单
export interface Order {
    id: number;
    number: string;
    userId: number;
    totalAmount: number;
    totalCount: number;
    status: number;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    remark: string;
}

// 订单详情
export interface OrderDetail {
    id: number;
    masterId: number;
    productId: number;
    count: number;
    amount: number;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    remark: string;
    product: Product;
}

// 商品
export interface Product {
    id: number;
    code: string;
    name: string;
    unit: string;
    price: number;
    stock: number;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    imageUrls: string[];
    brandId: number;
    brandName: string;
}

// 商品品类
export interface ProductType {
    id?: number;
    parentId?: number;
    name: string;
    orderNum?: number;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    imageUrls?: string[];
}

// 角色
export interface Role {
    roleId: number;
    roleName: string;
    roleKey: string;
    roleSort: number;
    dataScope: string;
    menuCheckStrictly: number;
    status: string;
    delFlag: string;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    remark: string;
}

// 用户
export interface User {
    userId: number;
    userName: string;
    nickName: string;
    email: string;
    phoneNumber: string;
    sex: string;
    avatar: string;
}

// 用户
export interface Token {
    access_token?: string;
    expires_in?: number;
    refresh_token?: string;
}

// 用户地址
export interface UserAddress {
    id?: number;
    userId: number;
    receiverName: string;
    receiverTel: string;
    defaultStatus: number;
    postCode: string;
    province: string;
    city: string;
    region: string;
    areaCode: string;
    detailAddress: string;
    fullAddress: string;
    updateBy?: string;
    updateTime?: string;
    createBy?: string;
    createTime?: string;
}





