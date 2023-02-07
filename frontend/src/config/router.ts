import type { Component } from 'vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { AppPath, APP_CONTENT_ELEMENT_ID, MAIN_CONTENT_ELEMENT_ID } from './constant';

const AppLayoutComponent = () => import('@/component/layout/AppLayout.vue');

function makeAppLayoutRecord(mainComponent: () => Component, name: string): RouteRecordRaw {
	return {
		name: name + 'Layout',
		path: '',
		components: {
			[MAIN_CONTENT_ELEMENT_ID]: mainComponent,
		},
	};
}

export const routes: readonly RouteRecordRaw[] = [
	{
		path: AppPath.Login,
		name: 'Login',
		components: {
			[APP_CONTENT_ELEMENT_ID]: () => import('@/page/LoginPage.vue'),
		},
	},
	{
		path: AppPath.Config,
		name: 'Config',
		components: {
			[APP_CONTENT_ELEMENT_ID]: AppLayoutComponent,
		},
		children: [makeAppLayoutRecord(() => import('@/page/UserAppConfig.vue'), 'Config')],
	},
	{
		path: AppPath.Home,
		name: 'Home',
		components: {
			[APP_CONTENT_ELEMENT_ID]: AppLayoutComponent,
		},
		children: [makeAppLayoutRecord(() => import('@/page/HomePage.vue'), 'Home')],
	},
	{
		path: AppPath.Customer,
		name: 'Customer',
		components: {
			[APP_CONTENT_ELEMENT_ID]: AppLayoutComponent,
		},
		children: [makeAppLayoutRecord(() => import('@/page/CustomerPage.vue'), 'Customer')],
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
