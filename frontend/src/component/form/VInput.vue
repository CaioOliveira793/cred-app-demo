<script setup lang="ts">
import InputStyle from '@/style/form/Input.module.css';
import SpinnerStyle from '@/style/feedback/Spinner.module.css';

// TODO: add `standard` input variant.
// See [Material UI TextField](https://mui.com/material-ui/react-text-field/)
export type InputVariant = 'outlined' | 'contained';
export type InputSize = 'small' | 'medium' | 'large';
export interface InputProps {
	type?: string;
	variant?: InputVariant;
	size?: InputSize;
	invalid?: boolean;
	focused?: boolean;
	disabled?: boolean;
	loading?: boolean;
	fullwidth?: boolean;

	wrapperAttrs?: Record<string, unknown>;
}

withDefaults(defineProps<InputProps>(), {
	variant: 'contained',
	size: 'medium',
	invalid: false,
	loading: false,
	type: 'text',
});

// TODO: span input element through all the `.input` component area
</script>

<template>
	<div
		:invalid="invalid ? '' : null"
		:disabled="disabled ? '' : null"
		:focused="focused ? '' : null"
		:fullwidth="fullwidth ? '' : null"
		:class="[InputStyle.input, InputStyle[variant], InputStyle[size]]"
		v-bind="wrapperAttrs"
	>
		<div :class="SpinnerStyle.arch" v-if="loading" />
		<slot name="startAdornment" v-else />
		<input :type="type" :disabled="disabled" v-bind="$attrs" />
		<slot name="endAdornment" />
	</div>
</template>

<script lang="ts">
export default {
	inheritAttrs: false,
};
</script>
