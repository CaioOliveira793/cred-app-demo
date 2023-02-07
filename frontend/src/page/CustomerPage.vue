<script setup lang="ts">
import CustomerSearch from '@/component/customer/CustomerSearch.vue';
import CustomerItem from '@/component/customer/CustomerItem.vue';
import type { Customer, CustomerQueryParams } from '@/resource/Customer';
import { useForm } from '@/composable/useFinalForm';
import { zodFormAdapter } from '@/validation/ZodHelper';
import { CustomerQueryParamsSchema } from '@/validation/Customer';

const customers: Customer[] = [];

const formApi = useForm<CustomerQueryParams>({
	validate: zodFormAdapter(CustomerQueryParamsSchema),
	submit: queryCustomer,
});

async function queryCustomer(params: CustomerQueryParams) {
	console.log(params);
}
</script>

<template>
	<main>
		<h3 :class="$style.heading3">Clientes</h3>

		<CustomerSearch :formApi="formApi" />

		<div :class="$style.customer_list">
			<CustomerItem v-for="customer in customers" :key="customer.id" :customer="customer" />
		</div>

		<div :class="$style.pagination_container"></div>
	</main>
</template>

<style module>
@import '@/style/Typography.module.css';

.customer_list {
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: stretch;
	gap: calc(var(--spacing-unit) * 2);
}

.pagination_container {
	display: none;
}
</style>
