import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		name: 'Login',
		path: '/login',
		component: () => import('@/views/Login.vue'),
		meta: {
			hideNavbar: true,
		   }
	},
	{
		name: 'EventCreate',
		path: '/create',
		component: () => import('@/views/EventCreate.vue')
	},
	{
		name: 'EventList',
		path: '/events',
		component: () => import('@/views/EventList.vue')
	},
	{
		name: 'EventListIndex',
		path: '/',
		component: () => import('@/views/EventList.vue')
	},
	{
		name: 'EventDetail',
		path: '/events/details/:eventid',
		component: () => import('@/views/EventDetail.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
