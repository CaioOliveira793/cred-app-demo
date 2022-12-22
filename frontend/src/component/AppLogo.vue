<script setup lang="ts">
import CediIcon from '~icons/fa6-solid/cedi-sign';

interface AppLogoProps {
	landscape?: boolean;
}

const props = defineProps<AppLogoProps>();
</script>

<template>
	<div class="landscape_logo">
		<CediIcon class="app_logo" />
		<strong v-if="props.landscape">CredApp Demo</strong>
	</div>
</template>

<style scoped>
.landscape_logo {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: var(--global-spacing-unit);
}

.app_logo {
	box-sizing: content-box;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	padding: calc(var(--global-padding-unit) * 1);
	background-color: var(--global-bg-color);
	border-radius: calc(var(--global-border-radius-unit) * 2);
}
</style>
