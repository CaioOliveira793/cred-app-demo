<script setup lang="ts">
import VButton from '@/component/form/VButton.vue';
import NativeSelect, { type NativeSelectOption } from '@/component/form/NativeSelect.vue';
import {
	DEFAULT_PAGE_LIMIT,
	isFirstPage,
	isLastPage,
	pageRange,
	PAGE_LIMIT_OPTIONS,
} from '@/util/Pagination';

export interface TablePaginationProps {
	pageIndex?: number;
	pageLimit?: number;
	total?: number | null;
}

const PAGE_LIMIT_SELECT_OPTIONS: NativeSelectOption[] = PAGE_LIMIT_OPTIONS.map(limit => ({
	label: limit.toString(),
	value: limit.toString(),
}));

withDefaults(defineProps<TablePaginationProps>(), {
	pageIndex: 0,
	pageLimit: DEFAULT_PAGE_LIMIT,
	total: null,
});

const emit = defineEmits<{
	(e: 'changePageLimit', data: number): void;
	(e: 'changePageIndex', data: number): void;
}>();

function changeLimitHandler(event: InputEvent) {
	const sel = event.target as HTMLSelectElement;
	const pageLimit = Number.parseInt(sel.value);
	emit('changePageLimit', pageLimit);
}

function paginationFormatter(
	pageIndex: number,
	pageLimit: number,
	total: number | null = null
): string {
	const [start, end] = pageRange(pageIndex, pageLimit, total);
	const countStart = start + 1;
	const countEnd = end + 1;

	return total ? `${countStart} - ${countEnd} de ${total}` : `${countStart} - ${countEnd}`;
}
</script>

<template>
	<div :class="$style.container">
		<div :class="$style.row_selection">
			<p>Linhas por página:</p>
			<NativeSelect
				variant="contained"
				size="small"
				:options="PAGE_LIMIT_SELECT_OPTIONS"
				:value="pageLimit.toString()"
				@input="changeLimitHandler"
			/>
		</div>
		<p>{{ paginationFormatter(pageIndex, pageLimit, total) }}</p>
		<div :class="$style.pagination_control">
			<VButton
				variant="icon_outlined"
				size="small"
				:disabled="isFirstPage(pageIndex)"
				@click="$emit('changePageIndex', pageIndex - 1)"
			>
				{{ '<' }}
			</VButton>
			<VButton
				variant="icon_outlined"
				size="small"
				:disabled="isLastPage(pageIndex, pageLimit, total)"
				@click="$emit('changePageIndex', pageIndex + 1)"
			>
				{{ '>' }}
			</VButton>
		</div>
	</div>
</template>

<style module>
.container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	align-items: center;
	gap: calc(var(--spacing-unit) * 4);
	padding: calc(var(--padding-unit) * 0.5) calc(var(--padding-unit) * 1.5);
	width: 100%;
	flex: 1 1;
	overflow-x: auto;
}

.row_selection {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: calc(var(--spacing-unit) * 1.5);
	width: fit-content;
}

.pagination_control {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: calc(var(--spacing-unit) * 1.5);
	width: fit-content;
}
</style>
