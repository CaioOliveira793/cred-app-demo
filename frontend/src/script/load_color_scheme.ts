import {
	applyColorScheme,
	applyThemeColor,
	getColorScheme,
	getColorSchemeMetaElement,
	getThemeColor,
	persistColorScheme,
	persistThemeColor,
} from '@/function/StyleModule';

function loadAppTheme() {
	const colorSchemeMeta = getColorSchemeMetaElement();
	const colorScheme = getColorScheme(colorSchemeMeta);
	persistColorScheme(colorScheme);
	applyColorScheme(colorScheme, colorSchemeMeta);

	const themeColor = getThemeColor();
	persistThemeColor(themeColor);
	applyThemeColor(themeColor);
}

globalThis.window.addEventListener('load', loadAppTheme);
