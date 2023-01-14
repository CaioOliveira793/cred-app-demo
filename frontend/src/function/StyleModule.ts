import {
	COLOR_SCHEME_HTML_ATTRIBUTE,
	COLOR_SCHEME_LIST,
	COLOR_SCHEME_STORAGE_KEY,
	DARK_COLOR_SCHEME,
	LIGHT_COLOR_SCHEME,
	THEME_COLOR_HTML_ATTRIBUTE,
	THEME_COLOR_STORAGE_KEY,
	THEME_COLOR_CSS_VARIABLE,
	type ColorScheme,
	ORIGINAL_THEME_COLOR_HUE_CSS_VARIABLE,
	ORIGINAL_THEME_COLOR_SATURATION_CSS_VARIABLE,
	ORIGINAL_THEME_COLOR_LIGHTNESS_CSS_VARIABLE,
	ORIGINAL_THEME_COLOR_CSS_VARIABLE,
	ORIGINAL_THEME_COLOR_ALPHA_CSS_VARIABLE,
} from '@/config/constant';

// # CSS Unit

export function CSSpx(value: number): string {
	return value + 'px';
}

export interface ColorHSLA {
	hue: number;
	saturation: number;
	lightness: number;
	alpha: number;
}

export function CSShsl(color: ColorHSLA): string {
	return `hsl(${color.hue}deg ${color.saturation}% ${color.lightness}% / ${color.alpha}%)`;
}

const HSLA_REGEX =
	/hsla?\(\s*(?<h>\d+)(deg)?\s*(?<s>[\d.]+)%\s*(?<l>[\d.]+)%\s*(\/\s*(?<a>\d+)%)?\s*\)/;

export function parseCSShsl(color: string): ColorHSLA | null {
	if (typeof color !== 'string') {
		return null;
	}

	const match = HSLA_REGEX.exec(color);

	if (match) {
		const { h, s, l, a } = match.groups ?? {};
		return {
			hue: Number.parseFloat(h),
			saturation: Number.parseFloat(s),
			lightness: Number.parseFloat(l),
			alpha: a ? Number.parseFloat(a) : 0,
		};
	}

	return null;
}

export function compareHSL(lhs: ColorHSLA, rhs: ColorHSLA): boolean {
	return (
		lhs.hue === rhs.hue &&
		lhs.saturation === rhs.saturation &&
		lhs.lightness === rhs.lightness &&
		lhs.alpha === rhs.alpha
	);
}

// # color-scheme

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

// # theme-color

/**
 * Return the theme color meta element.
 *
 * The meta element is selected from the document head, when not present, a meta element is created
 * and appended in the head element.
 *
 * @returns theme-color meta element
 */
export function getThemeColorMetaElement(): HTMLMetaElement {
	return (
		globalThis.document.head.querySelector(`meta[name="${THEME_COLOR_HTML_ATTRIBUTE}"]`) ??
		createThemeColorMetaElement()
	);
}

/**
 * Create a theme-color meta element
 *
 * @returns `<meta name="theme-color" content="">`
 */
function createThemeColorMetaElement(): HTMLMetaElement {
	const meta = globalThis.document.createElement('meta');
	meta.name = THEME_COLOR_HTML_ATTRIBUTE;
	meta.content = '';
	return globalThis.document.head.appendChild(meta);
}

/**
 * Return a mixed theme color with the current color scheme from the app styles
 *
 * @throws in case the loaded mixed theme color css variable is invalid or not present
 * @returns theme color mixed with current color scheme
 */
export function getMixedThemeColor(): ColorHSLA {
	const styles = getComputedStyle(globalThis.window.document.documentElement);

	const themeColor = parseCSShsl(styles.getPropertyValue(THEME_COLOR_CSS_VARIABLE));
	if (themeColor === null) {
		throw new Error(
			`Invalid mixed theme color loaded from css property "${THEME_COLOR_CSS_VARIABLE}"`
		);
	}

	return themeColor;
}

export function persistThemeColor(themeColor: ColorHSLA) {
	globalThis.localStorage.setItem(THEME_COLOR_STORAGE_KEY, CSShsl(themeColor));
}

export function persistedThemeColor(): ColorHSLA | null {
	const value = globalThis.localStorage.getItem(THEME_COLOR_STORAGE_KEY);
	return value ? parseCSShsl(value) : null;
}

export function getThemeColor(): ColorHSLA {
	return persistedThemeColor() ?? currentThemeColor();
}

/**
 * Return the current theme color from the app styles
 *
 * @throws in case the loaded theme color css variable is invalid or not present
 * @returns current theme color
 */
function currentThemeColor(): ColorHSLA {
	const styles = getComputedStyle(globalThis.document.documentElement);

	const themeColor = parseCSShsl(styles.getPropertyValue(ORIGINAL_THEME_COLOR_CSS_VARIABLE));
	if (themeColor === null) {
		throw new Error(
			`Invalid theme color loaded from css property "${ORIGINAL_THEME_COLOR_CSS_VARIABLE}"`
		);
	}

	return themeColor;
}

/**
 * Apply app theme color, returning the theme color mixed with the current color scheme.
 *
 * @param themeColor theme color
 * @returns theme color mixed with current color scheme
 */
export function applyThemeColor(
	themeColor: ColorHSLA,
	themeColorMeta: HTMLMetaElement = getThemeColorMetaElement()
): ColorHSLA {
	globalThis.document.documentElement.style.setProperty(
		ORIGINAL_THEME_COLOR_HUE_CSS_VARIABLE,
		themeColor.hue.toString()
	);
	globalThis.document.documentElement.style.setProperty(
		ORIGINAL_THEME_COLOR_SATURATION_CSS_VARIABLE,
		themeColor.saturation.toString()
	);
	globalThis.document.documentElement.style.setProperty(
		ORIGINAL_THEME_COLOR_LIGHTNESS_CSS_VARIABLE,
		themeColor.lightness.toString()
	);
	globalThis.document.documentElement.style.setProperty(
		ORIGINAL_THEME_COLOR_ALPHA_CSS_VARIABLE,
		themeColor.alpha.toString()
	);

	const mixed = getMixedThemeColor();
	applyMixedThemeColor(mixed, themeColorMeta);
	return mixed;
}

function applyMixedThemeColor(
	themeColor: ColorHSLA,
	metaElement: HTMLMetaElement = getThemeColorMetaElement()
) {
	const color = CSShsl(themeColor);
	globalThis.document.documentElement.setAttribute(THEME_COLOR_HTML_ATTRIBUTE, color);
	metaElement.content = color;
}
