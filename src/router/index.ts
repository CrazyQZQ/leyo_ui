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
		component: () => import('../views/order/index.vue')
	},
		{
		path: '/me',
		name: 'me',
		component: () => import('../views/me/index.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
