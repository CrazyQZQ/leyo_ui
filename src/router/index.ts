import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/Login',
		name: 'Login',
		// component: {
		// 	default: () => import('../views/home/Home.vue'),
		// 	Tabbar: () => import('../components/Tabbar.vue')
		// }
		component: () => import('@src/views/login/Login.vue')
	},
	{
		path: '/',
		name: 'Home',
		components: {
			default: () => import('../views/home/Home.vue'),
			Tabbar: () => import('../components/Tabbar.vue')
		}
	},
	{
		path: '/goods',
		name: 'goods',
		component: () => import('../views/goods/index.vue')
	},
	{
		path: '/category',
		name: 'category',
		components: {
			default: () => import('../views/category/index.vue'),
			Tabbar: () => import('../components/Tabbar.vue')
		}
	},
	{
		path: '/search',
		name: 'search',
		components: {
			default: () => import('../views/search/index.vue')
		}
	},
	{
		path: '/order',
		name: 'order',
		components: {
			default: () => import('../views/order/index.vue'),
			Tabbar: () => import('../components/Tabbar.vue')
		}
	},
	{
		path: '/shoppingCart',
		name: 'ShoppingCart',
		components: {
			default: () => import('../views/shoppingCart/index.vue'),
			Tabbar: () => import('../components/Tabbar.vue')
		}
	},
	{
		path: '/me',
		name: 'me',
		components: {
			default: () => import('../views/me/index.vue'),
			Tabbar: () => import('../components/Tabbar.vue')
		}
	},
	{
		path: '/address',
		name: 'Address',
		component: () => import('../views/address/index.vue')
	},
	{
		path: '/orderDetail',
		name: 'OrderDetail',
		component: () => import('../views/order/orderDetail.vue')
	},
	{
		path: '/submitOrder',
		name: 'SubmitOrder',
		component: () => import('../views/order/submitOrder.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
