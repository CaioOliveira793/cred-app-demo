import {
	COLOR_SCHEME_HTML_ATTRIBUTE,
	COLOR_SCHEME_LIST,
	COLOR_SCHEME_STORAGE_KEY,
	DARK_COLOR_SCHEME,
	LIGHT_COLOR_SCHEME,
	type ColorScheme,
} from '@/config/constant';

export function numberToCSSpx(value: number): string {
	return value + 'px';
}

function createColorSchemeMetaElement(): HTMLMetaElement {
	const meta = globalThis.document.createElement('meta');
	meta.name = COLOR_SCHEME_HTML_ATTRIBUTE;
	meta.content = preferedColorScheme();
	return globalThis.document.head.appendChild(meta);
}

export function getColorSchemeMetaElement(): HTMLMetaElement {
	return (
		globalThis.document.head.querySelector(`meta[name="${COLOR_SCHEME_HTML_ATTRIBUTE}"]`) ??
		createColorSchemeMetaElement()
	);
}

export function validColorScheme(colorScheme: unknown): ColorScheme | null {
	return COLOR_SCHEME_LIST.includes(colorScheme as ColorScheme)
		? (colorScheme as ColorScheme)
		: null;
}

export function preferedColorScheme(): ColorScheme {
	return globalThis.window.matchMedia('(prefers-color-scheme: dark)').matches
		? DARK_COLOR_SCHEME
		: LIGHT_COLOR_SCHEME;
}

export function getColorScheme(metaElement: HTMLMetaElement): ColorScheme {
	const colorScheme =
		persistedColorScheme() ??
		globalThis.document.documentElement.getAttribute(COLOR_SCHEME_HTML_ATTRIBUTE) ??
		metaElement.content;

	return validColorScheme(colorScheme) ?? preferedColorScheme();
}

/**
 * Retrieves the color-scheme value from the browser local storage
 * @param colorScheme color-scheme
 */
export function persistedColorScheme(): ColorScheme | null {
	return validColorScheme(globalThis.localStorage.getItem(COLOR_SCHEME_STORAGE_KEY));
}

/**
 * Persists the color scheme in the browser local storage
 * @param colorScheme color-scheme
 */
export function persistColorScheme(colorScheme: ColorScheme) {
	globalThis.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, colorScheme);
}

/**
 * Apply the color scheme
 * @param colorScheme color-scheme to be applied
 * @param metaElement color-scheme meta element
 */
export function applyColorScheme(colorScheme: ColorScheme, metaElement: HTMLMetaElement) {
	globalThis.document.documentElement.setAttribute(COLOR_SCHEME_HTML_ATTRIBUTE, colorScheme);
	metaElement.content = colorScheme;
}
