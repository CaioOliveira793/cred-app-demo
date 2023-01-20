import type { Component } from 'vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import {
	APP_CONTENT_ELEMENT_ID,
	LEFT_SIDEBAR_ELEMENT_ID,
	MAIN_CONTENT_ELEMENT_ID,
	TOP_NAVIGATION_ELEMENT_ID,
} from './constant';

const AppLayoutComponent = () => import('@/component/layout/AppLayout.vue');
const LeftSidebarComponent = () => import('@/component/navigation/SidebarNavigation.vue');
const TopNavigationComponent = () => import('@/component/navigation/TopNavigation.vue');

function makeAppLayoutRecord(mainComponent: () => Component): RouteRecordRaw {
	return {
		name: 'Layout',
		path: '',
		components: {
			[TOP_NAVIGATION_ELEMENT_ID]: TopNavigationComponent,
			[LEFT_SIDEBAR_ELEMENT_ID]: LeftSidebarComponent,
			[MAIN_CONTENT_ELEMENT_ID]: mainComponent,
		},
	};
}

export const routes: readonly RouteRecordRaw[] = [
	{
		path: '/home',
		name: 'Home',
		components: {
			[APP_CONTENT_ELEMENT_ID]: AppLayoutComponent,
		},
		children: [makeAppLayoutRecord(() => import('@/page/HomePage.vue'))],
	},
	{
		path: '/config',
		name: 'Config',
		components: {
			[APP_CONTENT_ELEMENT_ID]: AppLayoutComponent,
		},
		children: [makeAppLayoutRecord(() => import('@/page/UserAppConfig.vue'))],
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
