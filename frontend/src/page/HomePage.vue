<template>
	<main>
		<div>Home</div>
		<div :class="$style.today_metric">
			<h2>Métricas de hoje</h2>
			<section>
				<div :class="$style.card_metric_container">
					<h6 :class="$style.card_metric_title">Atendimentos</h6>
					<ul :class="$style.card_metric_list">
						<li>Sem interesse</li>
						<li>Com interesse</li>
						<li>Simulação iniciada</li>
						<li>Outro</li>
					</ul>
				</div>
			</section>
		</div>
	</main>
</template>

<style module>
.today_metric {
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: flex-start;
	gap: calc(var(--spacing-unit) * 2);
}

.card_metric_container {
	display: flex;
	flex-flow: column nowrap;
	width: fit-content;
	min-width: 220px;
	padding: calc(var(--padding-unit) * 2);
	border-radius: var(--border-radius-unit);
	color: var(--text-color-2);
	background-color: var(--surface-color-2);
}

.card_metric_title {
	font-weight: var(--font-weight-bold);
	composes: subtitle2 from '@/style/Typography.module.css';
}

.card_metric_list {
	composes: body2 from '@/style/Typography.module.css';
}
</style>
