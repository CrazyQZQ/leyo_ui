import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@src/store/index'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/Login',
		name: 'Login',
		meta: { requiresAuth: false },
		component: () => import('@src/views/login/Login.vue')
	},
	{
		path: '/',
		name: 'Home',
		meta: { requiresAuth: true },
		components: {
			default: () => import('../views/home/Home.vue'),
			Tabbar: () => import('../components/Tabbar.vue')
		}
	},
	{
		path: '/goodsList',
		name: 'GoodsList',
		meta: { requiresAuth: true },
		component: () => import('../views/goods/list/index.vue')
	},
	{
		path: '/goodsDetail',
		name: 'GoodsDetail',
		meta: { requiresAuth: true },
		component: () => import('../views/goods/detail/index.vue')
	},
	{
		path: '/category',
		name: 'Category',
		meta: { requiresAuth: true },
		components: {
			default: () => import('../views/category/index.vue'),
			Tabbar: () => import('../components/Tabbar.vue')
		}
	},
	{
		path: '/setting',
		name: 'Setting',
		components: {
			default: () => import('../views/setting/index.vue')
		}
	},
	{
		path: '/order',
		name: 'Order',
		meta: { requiresAuth: true },
		components: {
			default: () => import('../views/order/list/index.vue'),
			Tabbar: () => import('../components/Tabbar.vue')
		}
	},
	{
		path: '/orderDetail',
		name: 'OrderDetail',
		meta: { requiresAuth: true },
		component: () => import('../views/order/detail/index.vue')
	},
	{
		path: '/submitOrder',
		name: 'SubmitOrder',
		meta: { requiresAuth: true },
		component: () => import('../views/order/submit/index.vue')
	},
	{
		path: '/shoppingCart',
		name: 'ShoppingCart',
		meta: { requiresAuth: true },
		components: {
			default: () => import('../views/shoppingCart/index.vue'),
			Tabbar: () => import('../components/Tabbar.vue')
		}
	},
	{
		path: '/me',
		name: 'Me',
		meta: { requiresAuth: true },
		components: {
			default: () => import('../views/me/index.vue'),
			Tabbar: () => import('../components/Tabbar.vue')
		}
	},
	{
		path: '/address',
		name: 'Address',
		meta: { requiresAuth: true },
		component: () => import('../views/address/index.vue')
	},
	{
		path: '/addressEdit',
		name: 'AddressEdit',
		component: () => import('../views/address/addressEdit.vue')
	},
	{
		path: '/messages',
		name: 'Messages',
		meta: { requiresAuth: true },
		component: () => import('../views/messages/index.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})
// 4. ??????????????????????????????????????????????????????
router.beforeEach((to, from, next) => {
	// 1. ????????????????????????????????? next() ??? ?????????????????? api ????????????????????????????????????
	// 2. ???????????????????????????????????????????????????????????????
	const isAuth = store.state.auth.isAuth
	console.log('isAuth', isAuth)
	if (to.path === '/login')  next()
	if (to.meta.requiresAuth && !isAuth) {
		next('/login')
	} else {
		next()
	}
})
export default router
