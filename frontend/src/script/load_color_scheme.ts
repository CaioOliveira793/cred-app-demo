import {
	COLOR_SCHEME_HTML_ATTRIBUTE,
	COLOR_SCHEME_STORAGE_KEY,
	DEFAULT_COLOR_SCHEME,
	type ColorScheme,
} from '@/config/constant';

const metaElement = getMetaElement();
const colorScheme = initialColorScheme(metaElement);
setColorScheme(colorScheme, metaElement);

function getMetaElement(): HTMLMetaElement {
	return (
		globalThis.document.head.querySelector(`meta[name="${COLOR_SCHEME_HTML_ATTRIBUTE}"]`) ??
		createMetaElement()
	);
}

function createMetaElement(): HTMLMetaElement {
	const meta = globalThis.document.createElement('meta');
	meta.name = COLOR_SCHEME_HTML_ATTRIBUTE;
	meta.content = DEFAULT_COLOR_SCHEME;
	return globalThis.document.head.appendChild(meta);
}

function initialColorScheme(metaElement: HTMLMetaElement): ColorScheme {
	return (globalThis.localStorage.getItem(COLOR_SCHEME_STORAGE_KEY) ??
		globalThis.document.documentElement.getAttribute(COLOR_SCHEME_HTML_ATTRIBUTE) ??
		metaElement.content ??
		DEFAULT_COLOR_SCHEME) as ColorScheme;
}

function setColorScheme(colorScheme: ColorScheme, metaElement: HTMLMetaElement) {
	globalThis.localStorage.setItem(COLOR_SCHEME_STORAGE_KEY, colorScheme);
	globalThis.document.documentElement.setAttribute(COLOR_SCHEME_HTML_ATTRIBUTE, colorScheme);
	metaElement.content = colorScheme;
}
