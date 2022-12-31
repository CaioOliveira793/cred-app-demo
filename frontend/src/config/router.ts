import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import {
	APP_CONTENT_ELEMENT_ID,
	LEFT_SIDEBAR_ELEMENT_ID,
	MAIN_CONTENT_ELEMENT_ID,
	TOP_NAVIGATION_ELEMENT_ID,
} from './constant';

const AppLayoutRecord: RouteRecordRaw = {
	path: '',
	name: 'AppLayout',
	components: {
		[TOP_NAVIGATION_ELEMENT_ID]: () => import('@/component/navigation/TopNavigation.vue'),
		[LEFT_SIDEBAR_ELEMENT_ID]: () => import('@/component/navigation/SidebarNavigation.vue'),
		[MAIN_CONTENT_ELEMENT_ID]: () => import('@/page/HomePage.vue'),
	},
	props: true,
};

export const routes: readonly RouteRecordRaw[] = [
	{
		path: '/home',
		name: 'Home',
		props: true,
		components: {
			[APP_CONTENT_ELEMENT_ID]: () => import('@/component/layout/AppLayout.vue'),
		},
		children: [AppLayoutRecord],
	},
	{
		path: '/:catch_all(.*)',
		name: 'NotFount',
		components: {
			[APP_CONTENT_ELEMENT_ID]: () => import('@/page/NotFound.vue'),
		},
	},
];

export const router = createRouter({
	history: createWebHistory(),
	strict: false,
	sensitive: false,
	routes,
});
