<template>
	<div class="me-container">
		<van-nav-bar title="我的订单" left-arrow @click-left="goBack"></van-nav-bar>
		<van-sticky>
			<van-tabs
				@click="onChangeTab"
				:color="'#ff770f'"
				:title-active-color="'#ff770f'"
				v-model:active="orderStatus"
			>
				<van-tab title="全部" name></van-tab>
				<van-tab title="待付款" name="0"></van-tab>
				<van-tab title="待发货" name="1"></van-tab>
				<van-tab title="待收货" name="2"></van-tab>
				<van-tab title="待评价" name="3"></van-tab>
				<van-tab title="退款/售后" name="4"></van-tab>
			</van-tabs>
		</van-sticky>
		<div class="h-full w-full">
			<van-pull-refresh
				v-model="refreshing"
				@refresh="onRefresh"
				class="w-full h-full"
				style="overflow-y: auto;"
			>
				<van-list
					v-model:loading="loading"
					:finished="finished"
					finished-text="没有更多了"
					@load="onLoad"
					:immediate-check="false"
					class="w-full"
				>
					<div
						v-for="(item, index) in list"
						:key="index"
						class="shadow-md p-1 m-5 bg-white rounded-lg van-hairline--top"
					>
						<van-row class="text-sm px-2">
							<van-row class="w-full">
								<van-col span="12" class="text-left">
									<img :src="logoUrl" class="w-10 inline-block" />
									<span>Leyo精选</span>
								</van-col>
								<van-col span="12">
									<span class="float-right mt-1">{{formatOrderStatus(item.orderStatus)}}</span>
								</van-col>
							</van-row>
						</van-row>
						<van-card
							v-for="(one,idx) in item.orderDetailList"
							:key="idx"
							:num="one.count"
							:price="one.sku.price"
							:desc="one.sku.typeName + ' ' + one.sku.brandName"
							:title="one.productName"
							:thumb="one.sku.imageUrl?one.sku.imageUrl:defaultErrorImage"
							@click="goTo(item)"
						>
							<template #footer>
								<span class="font-bold">价格：</span>
								<span class="text-red-500">￥{{ item.totalAmount?item.totalAmount:'' }}</span>
							</template>
						</van-card>
						<van-row class="w-full text-sm pt-1">
							<van-col :span="24">
								<van-button round color="#ff770f" size="small" class="float-right">再次购买</van-button>
								<van-button round type="default" size="small" class="float-right right-3">查看评价</van-button>
							</van-col>
						</van-row>
					</div>
				</van-list>
			</van-pull-refresh>
		</div>
	</div>
</template>

<script lang="ts">
import logoUrl from '@assets/logo.png'
import { reactive, toRefs, onMounted, computed } from 'vue'
import { getOrderList } from '@src/api/order'
import { Order, OrderDetail } from '@src/models/order'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { IGlobalState } from '@src/store'
import { defaultErrorImage } from '@src/common/common'
import { BaseResponseType } from '@src/models/common'

export default {
	name: 'Order',
	components: {},
	setup() {
		const store = useStore<IGlobalState>()
		const router = useRouter()
		const route = useRoute()
		let state = reactive({
			orderStatus: '',
			loading: false,
			finished: false,
			refreshing: false,
			list: Array<Order>(),
			page: 1,
			total: 0
		})

		onMounted(() => {
			if (route.query.status) {
				state.orderStatus = route.query.status as string
			}
			loadData()
		})

		const loadData = () => {
			if (state.finished) {
				state.loading = false
				return
			}
			getOrderList({
				pageNum: state.page,
				pageSize: 10,
				orderStatus: state.orderStatus,
				userId: store.state.auth.userInfo.userId
			}).then((res) => {
				if (res) {
					const { data } = res as BaseResponseType<Order>
					let arr = data.rows as Order[]
					state.list = state.list.concat(arr)
					state.total = data.total || 0
				}
				state.loading = false
				if (state.list.length >= state.total) {
					state.finished = true
				}
			})
		}

		const onChangeTab = (name: string) => {
			state.orderStatus = name
			onRefresh()
		}

		const goTo = (order: Order) => {
			if (order && order.id) {
				router.push(`/orderDetail?orderId=${order.id}`)
			}
		}

		const goBack = () => {
			router.go(-1)
		}

		const onLoad = () => {
			console.log('onLoad');
			if (state.refreshing) {
				state.list.length = 0
				state.page = 1
				state.refreshing = false
			} else if (state.list.length < state.total) {
				state.page = state.page + 1
			}
			loadData()
		}

		const onRefresh = () => {
			state.refreshing = true
			state.finished = false
			state.loading = true
			onLoad()
		}

		const formatOrderStatus = computed(() => {
			return (orderStatus: number) => {
				return orderStatus === 0
					? '待付款'
					: orderStatus === 1
					? '待发货'
					: orderStatus === 2
					? '待收货'
					: orderStatus === 3
					? '待评价'
					: orderStatus === 4
					? '退款/售后'
					: '已取消'
			}
		})

		return {
			...toRefs(state),
			onChangeTab,
			goTo,
			goBack,
			onLoad,
			onRefresh,
			defaultErrorImage,
			logoUrl,
			formatOrderStatus
		}
	}
}
</script>