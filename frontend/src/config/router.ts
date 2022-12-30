import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import {
	APP_CONTENT_ELEMENT_ID,
	LEFT_SIDEBAR_ELEMENT_ID,
	TOP_NAVIGATION_ELEMENT_ID,
} from './constant';

export const routes: readonly RouteRecordRaw[] = [
	{
		path: '/home',
		name: 'Home',
		components: {
			[TOP_NAVIGATION_ELEMENT_ID]: () => import('@/component/navigation/TopNavigation.vue'),
			[APP_CONTENT_ELEMENT_ID]: () => import('@/page/HomePage.vue'),
			[LEFT_SIDEBAR_ELEMENT_ID]: () => import('@/component/navigation/SidebarNavigation.vue'),
		},
		props: true,
	},
];

export const router = createRouter({
	history: createWebHistory(),
	strict: false,
	routes,
});
