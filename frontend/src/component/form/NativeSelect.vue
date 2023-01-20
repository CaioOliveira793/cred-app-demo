<script setup lang="ts">
import InputStyle from '@/style/form/Input.module.css';
import TypographyStyle from '@/style/Typography.module.css';
import InputLabel from '@/component/form/InputLabel.vue';
import { nanoid } from 'nanoid';
import type { InputSize, InputVariant } from './VInput.vue';

export interface NativeSelectOption {
	label: string;
	value: string;
}

export interface NativeSelectProps {
	id?: string;
	label?: string;
	asterisk?: boolean;

	variant?: InputVariant;
	size?: InputSize;
	invalid?: boolean;
	focused?: boolean;
	disabled?: boolean;

	modelValue?: string;
	options: NativeSelectOption[];
}

defineEmits(['update:modelValue']);

withDefaults(defineProps<NativeSelectProps>(), {
	id: nanoid(),
	variant: 'contained',
	size: 'medium',
	invalid: false,
	disabled: false,
});

function selectInput(event: Event): string | null {
	const target = event.target as HTMLSelectElement | null;
	return target?.value ?? null;
}
</script>

<template>
	<div :class="[InputStyle.wrapper, $attrs.class]">
		<InputLabel :for="id" v-if="label" :label="label" :asterisk="asterisk" />
		<p v-if="$slots.description" :class="TypographyStyle.helper_text">
			<slot name="description" />
		</p>
		<select
			:id="id"
			:invalid="invalid || Boolean($slots.errorMessage) ? '' : null"
			:disabled="disabled"
			:focused="focused ? '' : null"
			:class="[InputStyle.input, InputStyle[variant], InputStyle[size], $style.select]"
			:value="modelValue"
			@input="$emit('update:modelValue', selectInput($event))"
			v-bind="$attrs"
		>
			<slot name="option" :options="options">
				<option v-for="option in options" :key="option.value" :value="option.value">
					{{ option.label }}
				</option>
			</slot>
		</select>
		<p v-if="$slots.helperText" :class="TypographyStyle.helper_text">
			<slot name="helperText" />
		</p>
		<p v-if="$slots.errorMessage" role="alert" :class="TypographyStyle.error_message">
			<slot name="errorMessage" />
		</p>
	</div>
</template>

<!-- TODO: fix native select size -->
<style module>
.select {
	padding: var(--padding-unit);
}
</style>
