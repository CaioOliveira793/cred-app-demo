import { reactive } from 'vue';
import { defineStore } from 'pinia';

export const APP_LAYOUT_STORE_KEY = 'app_layout';

export interface AppLayoutVarying {
	appBarHeight: number;
	sidebarWidth: number;
	sidebarVisible: boolean;
}

export interface UseAppLayoutReturn {
	readonly layout: Readonly<AppLayoutVarying>;

	toggleSidebarVisibility(): void;
	setAppBarHeight(height: number): void;
	setSidebarWidth(height: number): void;

	visibleSidebarWidth(): number;
}

function useAppLayoutComposable(): UseAppLayoutReturn {
	const layout = reactive<AppLayoutVarying>({
		appBarHeight: 0,
		sidebarWidth: 0,
		sidebarVisible: false,
	});

	function setAppBarHeight(height: number): void {
		layout.appBarHeight = height;
	}

	function setSidebarWidth(width: number): void {
		layout.sidebarWidth = width;
	}

	function toggleSidebarVisibility(): void {
		layout.sidebarVisible = !layout.sidebarVisible;
	}

	function visibleSidebarWidth(): number {
		return layout.sidebarVisible ? layout.sidebarWidth : 0;
	}

	return { layout, toggleSidebarVisibility, visibleSidebarWidth, setAppBarHeight, setSidebarWidth };
}

export const useAppLayout = defineStore<typeof APP_LAYOUT_STORE_KEY, UseAppLayoutReturn>(
	APP_LAYOUT_STORE_KEY,
	useAppLayoutComposable
);
