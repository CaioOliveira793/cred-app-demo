import { reactive, watch } from 'vue';
import {
	applyThemeColor,
	getThemeColor,
	getMixedThemeColor,
	type ColorHSLA,
} from '@/function/StyleModule';

export interface UseThemeColorReturn {
	/**
	 * Current theme color.
	 *
	 * Reactive object of the currently applied `theme-color`.
	 */
	themeColor: ColorHSLA;

	/**
	 * Current mixed theme color.
	 *
	 * Reactive object of the currently applied `theme-color` mixed with the current `color-scheme`.
	 */
	mixedThemeColor: ColorHSLA;
}

export function useThemeColor(): UseThemeColorReturn {
	const themeColor = reactive<ColorHSLA>(getThemeColor());
	const mixedThemeColor = reactive<ColorHSLA>(getMixedThemeColor());

	watch(themeColor, (themeColor: ColorHSLA) => {
		const mixed = applyThemeColor(themeColor);

		mixedThemeColor.hue = mixed.hue;
		mixedThemeColor.saturation = mixed.saturation;
		mixedThemeColor.lightness = mixed.lightness;
		mixedThemeColor.alpha = mixed.alpha;
	});

	return { themeColor, mixedThemeColor };
}
