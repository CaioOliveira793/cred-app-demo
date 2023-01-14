import {
	applyColorScheme,
	applyComputedThemeColor,
	getColorScheme,
	getColorSchemeMetaElement,
	getComputedThemeColor,
	getThemeColorMetaElement,
	persistColorScheme,
	persistOriginalThemeColor,
} from '@/function/StyleModule';

function loadAppTheme() {
	const colorSchemeMeta = getColorSchemeMetaElement();
	const colorScheme = getColorScheme(colorSchemeMeta);

	persistColorScheme(colorScheme);
	applyColorScheme(colorScheme, colorSchemeMeta);

	const themeColorMeta = getThemeColorMetaElement();
	const themeColor = getComputedThemeColor();

	persistOriginalThemeColor(themeColor);
	applyComputedThemeColor(themeColor, themeColorMeta);
}

globalThis.window.addEventListener('load', loadAppTheme);
