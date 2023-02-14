<script setup lang="ts">
import { ShortDateFormatter } from '@/formatter/DateTimeFormatter';
import type { Customer, CustomerConvenio } from '@/resource/Customer';

interface CustomerItem {
	customer: Customer;
	convenios?: CustomerConvenio[];
}

defineProps<CustomerItem>();

// move to formatter/other.ts
function notAvailable<T>(value: T | null): T | string {
	return value ? value : 'N/A';
}
</script>

<template>
	<div :class="$style.container">
		<router-link :to="`customer/${customer.id}`" :class="$style.subtitle">
			{{ customer.name }}
		</router-link>

		<div :class="$style.customer_info_container">
			<div :class="$style.info_block">
				<p>CPF: {{ customer.cpf }}</p>
				<p>
					E-mail: <a :href="'mailto:' + customer.email">{{ customer.email }}</a>
				</p>
			</div>

			<div :class="$style.info_block">
				<p>Nascimento: {{ ShortDateFormatter.format(customer.birthdate) }}</p>
			</div>

			<div :class="$style.info_block">
				<p>Telefones:</p>
				<ul>
					<li v-for="phone in customer.phones" :key="phone">
						<a :href="'tel:+' + phone">{{ phone }}</a>
					</li>
				</ul>
			</div>
		</div>

		<ul v-if="convenios" :class="$style.convenio_list">
			<li v-for="convenio in convenios" :key="convenio.id" :class="$style.convenio_container">
				<p :class="[$style.convenio_title, $style.body1]">
					{{ convenio.matricula ? convenio.name + ' - ' + convenio.matricula : convenio.name }}
				</p>
				<div :class="$style.convenio_financial_container">
					<div :class="$style.convenio_financial_row">
						<p>Benefício</p>
						<p>{{ notAvailable(convenio.benefit_amount) }}</p>
					</div>
					<div :class="$style.convenio_financial_row">
						<p>Margem total</p>
						<p>{{ notAvailable(convenio.total_margin) }}</p>
					</div>
					<div :class="$style.convenio_financial_row">
						<p>Margem disponível</p>
						<p>{{ notAvailable(convenio.available_margin) }}</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<style module>
@import '@/style/Typography.module.css';

.container {
	display: flex;
	flex-flow: column nowrap;
	gap: calc(var(--spacing-unit) * 2);
	padding: calc(var(--padding-unit) * 2);
	border-radius: var(--border-radius-unit);
	background-color: var(--surface-color-2);
	width: 100%;
}

.customer_info_container {
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	gap: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 4);
}

.info_block {
	display: flex;
	flex-flow: column nowrap;
	gap: calc(var(--spacing-unit) * 1);
}

.convenio_list {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: stretch;
	gap: calc(var(--spacing-unit) * 1.5);
	padding-bottom: calc(var(--padding-unit) * 1);
	width: 100%;
	overflow-y: auto;
}

/* TODO: extract convenio into a component */
.convenio_container {
	display: flex;
	flex-flow: column nowrap;
	gap: calc(var(--spacing-unit) * 1);
	padding: calc(var(--padding-unit) * 1.5);
	border-radius: var(--border-radius-unit);
	border: 1px solid var(--border-color);
	min-width: 160px;
	max-width: 280px;
	width: 100%;
}

.convenio_title {
	word-break: break-all;
}

.convenio_financial_container {
	display: flex;
	flex-flow: column nowrap;
	gap: calc(var(--spacing-unit) * 0.5);
}

.convenio_financial_row {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	gap: calc(var(--spacing-unit) * 2.5);
}
</style>
