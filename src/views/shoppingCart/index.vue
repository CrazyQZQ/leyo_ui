<template>
    <div class="cart-box">
        <van-nav-bar title="购物车"></van-nav-bar>
        <div class="cart-body">
            <van-swipe-cell stop-propagation v-for="(item, index) in cartItems" :key="index">
                <van-checkbox v-model="item.checked" checked-color="#b4282d"></van-checkbox>
                <van-card :tag="item.tag" :price="item.price" :desc="item.desc" :title="item.title" :thumb="item.thumb"
                    :origin-price="100" class="goods-card">
                    <template #footer>
                        <van-stepper v-model="item.num" @change="numChange(item.num)" />
                    </template>
                </van-card>
            </van-swipe-cell>
        </div>
        <van-submit-bar class="submit-bar" :price="3050" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="selectAll">全选</van-checkbox>
            <template #tip>
                你的收货地址不支持配送, <span @click="onClickLink">修改地址</span>
            </template>
        </van-submit-bar>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'ShoppingCart',
    components: {
    },
    setup() {
        const router = useRouter()
        const state = reactive({
            status: '',
            loading: false,
            finished: false,
            refreshing: false,
            list: [],
            page: 1,
            totalPage: 0
        })

        const goBack = () => {
            router.go(-1)
        }

        let cartItems = [
            {
                num: 2,
                tag: '标签',
                price: '2.00',
                desc: '描述信息',
                title: '商品标题',
                checked: false,
                thumb: 'http://124.221.239.207:9000/qqcloud/2022-05-09/cola.png',
                originPrice: '10.00'
            },
            {
                num: 2,
                tag: '标签',
                price: '2.00',
                desc: '描述信息',
                title: '商品标题',
                checked: false,
                thumb: 'http://124.221.239.207:9000/qqcloud/2022-05-09/cola.png',
                originPrice: '10.00'
            },
            {
                num: 2,
                tag: '标签',
                price: '2.00',
                desc: '描述信息',
                title: '商品标题',
                checked: true,
                thumb: 'http://124.221.239.207:9000/qqcloud/2022-05-09/cola.png',
                originPrice: '10.00'
            }
        ]



        const onSubmit = () => {
            router.push('/order')
        }

        const numChange = (num) => {
            console.log('numChange', num)
        }

        const selectAll = false
        return {
            ...toRefs(state),
            goBack,
            cartItems,
            onSubmit,
            selectAll,
            numChange
        }
    }
}
</script>
<style lang="less" scoped>
.cart-box {
    padding: 0.5rem;
    background-color: #fff;

    .cart-body {
        padding: 0.5rem;

        .van-checkbox {
            position: absolute;
            top: 41%;
            margin-top: -10px;
            left: 3px;
            z-index: 99999;
        }

        .goods-card {
            margin: 0;
            // background-color: $bagColor;
            padding: 4px 4px 3px 27px;

            .van-card__header {
                margin-left: 8px;
            }
        }
    }

    .submit-bar {
        bottom: 54px;
    }
}
</style>
