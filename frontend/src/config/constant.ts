/**
 * This module MUST be pure, e.g. not import any other module, allowing being used inside
 * script files (/src/script/**.ts).
 */

/**
 * Create keys unique to this application.
 * @param key
 * @returns unique key prefixed with the `APP_NAME`
 */
function makeAppKey(key: string): string {
	return import.meta.env.APP_NAME + '.' + key;
}

// # Styles (color-scheme and theme-color)

export type ColorScheme = 'light' | 'dark' | 'dim';

export const DEFAULT_COLOR_SCHEME: ColorScheme = 'light';
export const DARK_COLOR_SCHEME: ColorScheme = 'dark';
export const LIGHT_COLOR_SCHEME: ColorScheme = 'light';
export const COLOR_SCHEME_LIST: ColorScheme[] = ['light', 'dark', 'dim'];

export const COLOR_SCHEME_HTML_ATTRIBUTE = 'color-scheme';

export const COLOR_SCHEME_STORAGE_KEY = makeAppKey('color-scheme');

export const THEME_COLOR_HTML_ATTRIBUTE = 'theme-color';
export const THEME_COLOR_MIXED_CSS_VARIABLE = '--brand-color';

export const THEME_COLOR_HUE_CSS_VARIABLE = '--brand-color-original-hue';
export const THEME_COLOR_SATURATION_CSS_VARIABLE = '--brand-color-original-saturation';
export const THEME_COLOR_LIGHTNESS_CSS_VARIABLE = '--brand-color-original-lightness';
export const THEME_COLOR_ALPHA_CSS_VARIABLE = '--brand-color-original-alpha';
export const THEME_COLOR_CSS_VARIABLE = '--brand-color-original';

export const THEME_COLOR_STORAGE_KEY = makeAppKey('theme-color');

// # Element ID

/** Root element of the app */
export const APP_ROOT_ELEMENT_ID = 'app';

/** The root child element. */
export const APP_CONTENT_ELEMENT_ID = 'app_content';

/** The application element with the main content. */
export const MAIN_CONTENT_ELEMENT_ID = 'main_content';

/** Top navigation element. */
export const TOP_NAVIGATION_ELEMENT_ID = 'top_navigation';

/** Left sidebar element. */
export const LEFT_SIDEBAR_ELEMENT_ID = 'left_sidebar';

/** Right sidebar element. */
export const RIGHT_SIDEBAR_ELEMENT_ID = 'right_sidebar';

// # Page

export const enum AppPath {
	Login = '/login',
	Home = '/home',
	Config = '/config',
}

// # API

/** REST API hostname */
export const API_HOSTNAME = import.meta.env.API_HOSTNAME;
