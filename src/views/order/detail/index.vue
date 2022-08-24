<template>
	<div class="order-detail-box">
		<van-nav-bar title="订单详情" left-arrow @click-left="goBack">
			<template #right>
				<van-icon name="share-o" size="18" @click="showShare = true" />
			</template>
		</van-nav-bar>
		<div class="h-full px-2">
			<!-- address -->
			<div class="rounded-lg border-gray-300 shadow">
				<van-cell-group>
					<van-cell title="收货地址">
						<template #label>
							<van-row class="h-6 align-middle leading-8">收件人：{{ orderInfo.address ? orderInfo.address.receiverName : '' }}</van-row>
							<van-row class="h-6 align-middle leading-8">手机号：{{ orderInfo.address ? orderInfo.address.receiverTel : '' }}</van-row>
							<van-row class="h-6 align-middle leading-8">地址：{{ orderInfo.address ? orderInfo.address.fullAddress : '' }}</van-row>
						</template>
					</van-cell>
				</van-cell-group>
			</div>
			<div class="rounded-lg mt-5 border-gray-300 shadow">
				<van-list class="order-list">
					<van-card
						v-for="(item, index) in orderInfo.orderDetailList"
						:num="item.count"
						:price="item.sku ? item.sku.price : ''"
						:key="index"
						:desc="(item.sku ? item.sku.typeName : '') + '-' + (item.sku ? item.sku.brandName : '')"
						:title="item.sku ? item.sku.productName : ''"
						:thumb="item.sku ? item.sku.imageUrl : ''"
					>
						<template #tags>
							<van-tag class="mr-1" v-for="(attr, idx) in item.sku.skuAttributes" plain type="danger" :key="idx">{{
								attr.value
							}}</van-tag>
						</template>
					</van-card>
				</van-list>
			</div>
			<div class="rounded-lg mt-5 border-gray-300 shadow order-info">
				<van-cell-group>
					<van-cell title="订单编号" :value="orderInfo.number" title-style="max-width: 30%;" />
					<van-cell title="下单时间" :value="orderInfo.createTime" />
					<van-cell title="发票类型" value="不开发票" />
				</van-cell-group>
			</div>
			<div class="rounded-lg mt-5 border-gray-300 shadow order-info">
				<van-cell-group>
					<van-cell title="订单金额" :value="'￥' + orderInfo.totalAmount" />
					<van-cell title="活动优惠" value="-￥0" />
					<van-cell title="运费" value="+￥0" />
					<van-cell title="">
						<template #extra>
							<span>实付款</span>
							<span class="ml-2 text-red-400">￥{{ orderInfo.totalAmount }}元</span>
						</template>
					</van-cell>
				</van-cell-group>
			</div>
		</div>
		<van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
	</div>
</template>

<script lang="ts">
import { reactive, Ref, ref, toRefs, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Toast } from 'vant'
import { getOrderDetail } from '@src/api/order'
import { Order } from '@src/models/order'
import { BaseResponseType } from '@src/models/common'
import { toggle } from '@src/util/useToggle'
import order from '@src/store/modules/order'

export default {
	name: 'OrderDetail',
	components: {},
	setup() {
		const router = useRouter()
		const route = useRoute()
		const showShare = ref(false)
		let orderInfo: Order = reactive({
			id: 0,
			orderStatus: -1,
			number: '',
			userId: 0,
			totalAmount: 0,
			totalCount: 0,
			status: 0,
			createTime: '',
			address: {
				userId: 0,
				receiverName: '',
				receiverTel: '',
				defaultStatus: 0,
				postCode: '',
				province: '',
				city: '',
				region: '',
				areaCode: '',
				detailAddress: '',
				fullAddress: ''
			},
			orderDetailList: []
		})
		const goBack = () => {
			router.go(-1)
		}

		onMounted(async () => {
			toggle(true)
			if (route.query && route.query.orderId) {
				const orderId = route.query.orderId as string
				await getData(orderId)
			}
			toggle(false)
		})

		const getData = async (orderId: string) => {
			const { data } = (await getOrderDetail({ orderId: orderId })) as BaseResponseType<Order>
			const {
				id,
				number,
				userId,
				totalAmount,
				totalCount,
				status,
				orderStatus,
				remark,
				orderDetailList,
				address,
				createTime
			} = data
			orderInfo.id = id
			orderInfo.number = number
			orderInfo.userId = userId
			orderInfo.totalAmount = totalAmount
			orderInfo.totalCount = totalCount
			orderInfo.status = status
			orderInfo.orderStatus = orderStatus
			orderInfo.remark = remark
			orderInfo.orderDetailList = orderDetailList
			orderInfo.address = address
			orderInfo.createTime = createTime
		}

		const options = [
			{ name: '微信', icon: 'wechat' },
			{ name: '微博', icon: 'weibo' },
			{ name: '复制链接', icon: 'link' },
			{ name: '分享海报', icon: 'poster' },
			{ name: '二维码', icon: 'qrcode' }
		]

		const onSelect = (option: any) => {
			Toast(option.name)
			showShare.value = false
		}

		return {
			goBack,
      orderInfo,
			showShare,
			options,
			onSelect
		}
	}
}
</script>
<style lang="less" scoped>
.order-detail-box {
	padding: 0.5rem;
	background-color: #fff;
	.order-info {
		.van-cell__value {
			min-width: 70%;
			span {
				display: inline-block;
				text-align: left;
				word-break: break-all;
			}
		}
	}
}
</style>
