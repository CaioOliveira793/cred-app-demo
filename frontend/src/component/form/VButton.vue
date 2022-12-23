<script setup lang="ts">
import ButtonStyle from '@/style/form/Button.module.css';
import SpinnerStyle from '@/style/feedback/Spinner.module.css';

export type ButtonVariant =
	| 'outlined'
	| 'text'
	| 'contained'
	| 'icon_contained'
	| 'icon_outlined'
	| 'icon_flat';
export type ButtonColor = 'primary' | 'error' | 'success';
export type ButtonSize = 'none' | 'small' | 'medium' | 'large';

defineProps<{
	variant?: ButtonVariant;
	color?: ButtonColor;
	size?: ButtonSize;
	loading?: boolean;
}>();
</script>

<template>
	<button
		:class="[ButtonStyle[variant ?? 'contained'], ButtonStyle[size ?? 'medium']]"
		:s-color="color"
	>
		<div :class="SpinnerStyle.arch" v-if="loading" />
		<slot name="start-icon" v-else />
		<slot />
		<slot name="end-icon" />
	</button>
</template>
