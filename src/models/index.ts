// 账户
interface Account {
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
interface AreaInfo {
    id: number;
    parentId: number;
    code: string;
    name: string;
    level: number;
}

// 品牌
interface Brand {
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
interface Dept {
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
interface Menu {
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
interface Order {
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
interface OrderDetail {
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
interface Product {
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
interface ProductType {
    id: number;
    parentId: number;
    name: string;
    orderNum: number;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    imageUrls: string[];
}

// 角色
interface Role {
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
interface User {
    userId: number;
    deptId: number;
    userName: string;
    nickName: string;
    userType: string;
    email: string;
    phoneNumber: string;
    sex: string;
    avatar: string;
    password: string;
    status: string;
    delFlag: string;
    loginIp: string;
    loginDate: string;
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    remark: string;
    authorities: string[];
    jti: string;
    expireIn: number;
}

// 用户地址
interface UserAddress {
    id: number;
    userId: number;
    receiverName: string;
    receiverTel: string;
    defaultStatus: number;
    postCode: string;
    province: string;
    city: string;
    region: string;
    detailAddress: string;
    fullAddress: string;
    updateBy: string;
    updateTime: string;
    createBy: string;
    createTime: string;
}





