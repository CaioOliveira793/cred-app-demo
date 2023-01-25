import { reactive, ref, watch, type Ref } from 'vue';
import { defineStore } from 'pinia';
import {
	type ColorHSLA,
	applyThemeColor,
	getThemeColor,
	getMixedThemeColor,
	copyHSL,
	getColorSchemeMetaElement,
	getColorScheme,
	applyColorScheme,
	persistThemeColor,
	persistColorScheme,
} from '@/function/StyleModule';
import type { ColorScheme } from '@/config/constant';

const APP_COLOR_SCHEME_STORE_KEY = 'app_color_scheme';

export interface UseAppColorSchemeReturn {
	/**
	 * Current theme color.
	 *
	 * Reactive object of the currently applied `theme-color`.
	 */
	themeColor: ColorHSLA;

	/**
	 * Current mixed theme color.
	 *
	 * Reactive object of the currently applied `theme-color` mixed with
	 * the current `color-scheme`.
	 */
	mixedThemeColor: ColorHSLA;

	/**
	 * Current color scheme.
	 *
	 * Reference value of the currently applied `color-scheme`.
	 */
	colorScheme: Ref<ColorScheme>;
}

function useAppColorSchemeComposable(): UseAppColorSchemeReturn {
	// # theme-color
	const themeColor = reactive<ColorHSLA>(getThemeColor());
	const mixedThemeColor = reactive<ColorHSLA>(getMixedThemeColor());

	watch(themeColor, (themeColor: ColorHSLA) => {
		const mixed = applyThemeColor(themeColor);
		copyHSL(mixedThemeColor, mixed);
		persistThemeColor(themeColor);
	});

	// # color-scheme
	const metaElement = getColorSchemeMetaElement();
	const colorScheme = ref<ColorScheme>(getColorScheme(metaElement));

	watch(colorScheme, (colorScheme: ColorScheme) => {
		applyColorScheme(colorScheme, metaElement);
		persistColorScheme(colorScheme);
	});

	return { colorScheme, themeColor, mixedThemeColor };
}

export const useAppColorScheme = defineStore<
	typeof APP_COLOR_SCHEME_STORE_KEY,
	UseAppColorSchemeReturn
>(APP_COLOR_SCHEME_STORE_KEY, useAppColorSchemeComposable);
