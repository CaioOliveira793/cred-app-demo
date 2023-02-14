import type { Header } from '@tanstack/vue-table';

export const EMPTY_CELL_VALUE = '';
export const DEFAULT_CELL_VALUE = '-';

export type CellFormatter<Value> = (value?: Value | string) => string;

export function defaultCellFormatter<Value>(value?: Value | string): string {
	return typeof value !== 'string' ? DEFAULT_CELL_VALUE : value;
}

export function displayHeader<T, Value>(
	header: Header<T, Value>,
	formatter: CellFormatter<Value> = defaultCellFormatter
): string {
	if (header.isPlaceholder) {
		return EMPTY_CELL_VALUE;
	}

	// as AccessorFn
	if (typeof header.column.columnDef.header === 'function') {
		const context = header.getContext();
		const value = header.column.columnDef.header(context) as Value;
		return formatter(value);
	}

	// as string
	const value = header.column.columnDef.header;
	return formatter(value);
}
