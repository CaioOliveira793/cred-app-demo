<script setup lang="ts">
import CediIcon from '~icons/fa6-solid/cedi-sign';

defineProps<{ landscape?: boolean }>();
</script>

<template>
	<div :class="$style.landscape_logo">
		<CediIcon :class="$style.app_logo" />
		<strong v-if="landscape" :class="$style.logo_text">CredApp Demo</strong>
	</div>
</template>

<style module>
.landscape_logo {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: var(--spacing-unit);
}

.app_logo {
	box-sizing: content-box;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	padding: calc(var(--padding-unit) * 1);
	background-color: var(--surface-color-1);
	border-radius: calc(var(--border-radius-unit) * 2);
}

strong.logo_text {
	font-weight: var(--font-weight-bold);
}

.logo_text {
	composes: subtitle from '@/style/Typography.module.css';
}
</style>
