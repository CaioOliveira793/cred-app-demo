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
export type ButtonColor = 'primary' | 'info' | 'success' | 'warning' | 'error' | 'current';
export type ButtonSize = 'none' | 'small' | 'medium' | 'large';

interface ButtonProps {
	variant?: ButtonVariant;
	color?: ButtonColor;
	size?: ButtonSize;
	loading?: boolean;
	disabled?: boolean;
}

withDefaults(defineProps<ButtonProps>(), {
	color: 'primary',
	size: 'medium',
	variant: 'contained',
	loading: false,
	disabled: false,
});
</script>

<template>
	<button
		:class="[ButtonStyle[variant], ButtonStyle[size]]"
		:s-color="color"
		:loading="loading ? '' : null"
		:disabled="disabled ?? loading"
	>
		<div :class="SpinnerStyle.arch" v-if="loading" />
		<slot name="start-icon" v-else />
		<slot />
		<slot name="end-icon" />
	</button>
</template>
