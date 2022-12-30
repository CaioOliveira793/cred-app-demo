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

export type ColorScheme = 'light' | 'dark' | 'dim';

export const DEFAULT_COLOR_SCHEME: ColorScheme = 'light';

export const COLOR_SCHEME_HTML_ATTRIBUTE = 'color-scheme';

export const COLOR_SCHEME_STORAGE_KEY = makeAppKey('color-scheme');

// ---

export const APP_ROOT_ELEMENT_ID = 'app';
export const APP_CONTENT_ELEMENT_ID = 'app_content';
export const TOP_NAVIGATION_ELEMENT_ID = 'top_navigation';
export const LEFT_SIDEBAR_ELEMENT_ID = 'left_sidebar';
export const RIGHT_SIDEBAR_ELEMENT_ID = 'right_sidebar';
