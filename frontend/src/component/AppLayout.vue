<script setup lang="ts">
import AppNavigation from '@/component/navigation/AppNavigation.vue';
</script>

<template>
	<div :class="$style.middle_container">
		<AppNavigation />

		<!-- TODO: add breadcrumb -->
		<main :class="$style.app_content">
			<slot />
		</main>
	</div>
</template>

<style module>
.middle_container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: stretch;
	height: 100%;
}

.app_content {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: calc(var(--global-padding-unit) * 4);
	gap: calc(var(--global-padding-unit) * 4);
}
</style>
