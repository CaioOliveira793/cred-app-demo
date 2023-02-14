export const DEFAULT_PAGE_LIMIT = 30;
export const PAGE_LIMIT_OPTIONS = [15, 30, 50] as const;

/**
 * Calculates the **index** range of items in a given page index.
 *
 * @param pageIndex Page index.
 * @param pageLimit Limit of items in a page.
 * @param total Total count of items.
 *
 * @returns The **index** range of items in the page.
 */
export function pageRange(
	pageIndex: number,
	pageLimit: number,
	total: number | null = null
): [number, number] {
	const start = pageIndex * pageLimit;
	const end = total !== null ? Math.min(start + pageLimit, total) - 1 : pageLimit;
	return [start, end];
}

export function isFirstPage(pageIndex: number): boolean {
	return pageIndex === 0;
}

export function isLastPage(
	pageIndex: number,
	pageLimit: number,
	total: number | null = null
): boolean {
	return total !== null ? (pageIndex + 1) * pageLimit >= total : false;
}
