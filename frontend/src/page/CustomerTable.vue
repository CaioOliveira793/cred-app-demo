<script setup lang="ts">
import { createColumnHelper, useVueTable, getCoreRowModel } from '@tanstack/vue-table';
import { differenceInYears } from 'date-fns';
import { ref } from 'vue';
import TablePagination from '@/component/pagination/TablePagination.vue';
import { ShortDateFormatter } from '@/formatter/DateTimeFormatter';
import { ListConjunctionFormatter } from '@/formatter/ListFormatter';
import type { Customer } from '@/resource/Customer';
import { displayHeader } from '@/util/VueTable';
import { DEFAULT_PAGE_LIMIT } from '@/util/Pagination';

interface CustomerTableProps {
	data: Customer[];
}

const props = defineProps<CustomerTableProps>();

const helper = createColumnHelper<Customer>();
const customerTable = useVueTable({
	columns: [
		helper.accessor(row => row.name, { id: 'name', header: 'Nome' }),
		helper.accessor(row => row.cpf, { id: 'cpf', header: 'CPF' }),
		helper.accessor(row => row.email, { id: 'email', header: 'E-mail' }),
		helper.accessor(row => ListConjunctionFormatter.format(row.phones), {
			id: 'phones',
			header: 'Telefones',
		}),
		helper.accessor(row => ShortDateFormatter.format(row.birthdate), {
			id: 'birthdate',
			header: 'Nascimento',
		}),
		helper.accessor(row => differenceInYears(new Date(), row.birthdate), {
			id: 'age::gen',
			header: 'Idade',
		}),
	],
	data: props.data,
	getCoreRowModel: getCoreRowModel<Customer>(),
});

const columnCount = customerTable.getAllColumns().length;

const pageLimit = ref(DEFAULT_PAGE_LIMIT);
const pageIndex = ref(0);
</script>

<template>
	<table :class="$style.table_container" role="table">
		<thead :class="$style.table_header" role="rowgroup">
			<tr role="row">
				<th :colspan="columnCount" role="none">
					<TablePagination
						:total="data.length"
						:page-limit="pageLimit"
						:page-index="pageIndex"
						@change-page-limit="pageLimit = $event"
						@change-page-index="pageIndex = $event"
					/>
				</th>
			</tr>

			<tr v-for="headerGroup in customerTable.getHeaderGroups()" :key="headerGroup.id" role="row">
				<th
					v-for="header in headerGroup.headers"
					:key="header.id"
					:colspan="header.colSpan"
					:aria-colspan="header.colSpan"
					:class="$style.table_header_cell"
					role="columnheader"
					aria-sort="none"
				>
					{{ displayHeader(header) }}
				</th>
			</tr>
		</thead>

		<tbody :class="$style.table_body" role="rowgroup">
			<tr v-for="row in customerTable.getRowModel().rows" :key="row.id" role="row">
				<td v-for="cell in row.getVisibleCells()" :key="cell.id" role="cell">
					{{ cell.renderValue() }}
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style module>
.table_container {
	display: block;
	max-width: fit-content;
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0px;
	border-radius: var(--border-radius-unit);
	background-color: var(--surface-color-2);
	overflow: auto;
}

.table_header {
	width: 100%;
	border-top-left-radius: var(--border-radius-unit);
	border-top-right-radius: var(--border-radius-unit);
	background-color: var(--surface-color-3);

	/* sticky header */
	position: sticky;
	top: 0px;
}

.table_header_cell {
	composes: body1 from '@/style/Typography.module.css';

	padding: calc(var(--padding-unit) * 1) calc(var(--padding-unit) * 2);
	font-weight: var(--font-weight-bold);
	text-align: start;
}

.table_body {
	width: 100%;
}

.table_body td {
	padding: calc(var(--padding-unit) * 1.5) calc(var(--padding-unit) * 1.5);
	border-top: 1px solid var(--border-color);
}
</style>
