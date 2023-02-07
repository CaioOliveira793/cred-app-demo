<script setup lang="ts">
import VButton from '../form/VButton.vue';

defineEmits<{
	(e: 'reset'): void;
}>();
</script>

<template>
	<div :class="$style.search_button_container">
		<VButton type="reset" variant="outlined" color="warning" @click="$emit('reset')">
			Limpar
		</VButton>
		<VButton type="submit" variant="contained" color="success">Buscar</VButton>
	</div>
</template>

<style module>
.search_button_container {
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-end;
	align-items: center;
	gap: calc(var(--spacing-unit) * 2);
	width: 100%;
}
</style>
