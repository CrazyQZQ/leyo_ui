// 商品
export interface Product {
    id?: number;
    code?: string;
    name?: string;
    unit?: string;
    price?: number;
    stock?: number;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    imageUrls?: string[];
    brandId?: number;
    brandName?: string;
    skus?: Sku[];
    attributes?: Attribute[];
}

// 商品品类
export interface ProductType {
    id?: number;
    parentId?: number;
    name?: string;
    orderNum?: number;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    imageUrls?: string[];
}

interface Brand {
    id?: number;
    parentId?: number;
    name?: string;
    typeId?: number;
    orderNum?: number;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: null;
    imageUrls?: string[];
}

export interface Sku {
    id?: number;
    productId?: number;
    spec?: string;
    price?: number;
    originalPrice?: number;
    stock?: number;
    sales?: number;
    imageUrl?: string;
    productName?: string;
    brandName?: string;
    typeName?: string;
    skuAttributes?: SkuAttributes[];
}

export interface SkuAttributes {
    name: string;
    value: string;
}

export interface Attribute {
    id: number;
    name: string;
    values: AttributeValue[];
}

export interface AttributeValue {
    id?: number;
    name?: string;
    attributeId?: null;
    checked?: boolean;
}

export interface ShoppingCartItem {
    checked: boolean;
    id?: number;
    num?: number;
    skuId?: number;
    userId?: number;
    sku?: Sku;
}