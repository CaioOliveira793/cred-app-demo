<script setup lang="ts">
import 'normalize.css';
import '@/style/main.css';

import AppLayout from '@/component/AppLayout.vue';
</script>

<template>
	<AppLayout>
		<div class="today_metric">
			<h2>Métricas de hoje</h2>
			<section>
				<div class="card_metric_container">
					<h6 class="card_metric_title">Atendimentos</h6>
					<ul class="card_metric_list">
						<li>Sem interesse</li>
						<li>Com interesse</li>
						<li>Simulação iniciada</li>
						<li>Outro</li>
					</ul>
				</div>
			</section>
		</div>
	</AppLayout>
</template>

<style scoped>
.today_metric {
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: flex-start;
	gap: calc(var(--global-spacing-unit) * 2);
}

.card_metric_container {
	display: flex;
	flex-flow: column nowrap;
	width: fit-content;
	min-width: 220px;
	padding: calc(var(--global-padding-unit) * 2);
	border-radius: var(--global-border-radius-unit);

	background-color: var(--global-bg-emphasis-color);
}

.card_metric_title {
	font-size: 14px;
	color: var(--global-text-primary-color);
}

.card_metric_list {
	font-size: 14px;
	color: var(--global-text-secondary-color);
}
</style>
