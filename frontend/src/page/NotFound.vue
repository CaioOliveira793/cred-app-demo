<script setup lang="ts">
import { ref } from 'vue';

const logged = ref(true);
</script>

<template>
	<main :class="$style.main_content">
		<h1 :class="$style.not_found_text">Esta página não existe</h1>
		<p v-if="logged">
			Verifique sua URL ou volte para a <router-link to="/home">página inicial</router-link>.
		</p>
		<p v-if="!logged">
			Verifique sua URL ou volte para a
			<router-link to="/">página de login</router-link>.
		</p>
	</main>
</template>

<style module>
.main_content {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	margin: calc(var(--spacing-unit) * 4);
	gap: calc(var(--spacing-unit) * 2);
}

.not_found_text {
	composes: heading3 from '@/style/Typography.module.css';
}
</style>
