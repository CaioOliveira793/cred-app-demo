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

	// InputLabelProps
	label?: string;
	asterisk?: boolean;

	// InputProps
	variant?: InputVariant;
	size?: InputSize;
	invalid?: boolean;
	focused?: boolean;
	disabled?: boolean;
	fullwidth?: boolean;

	modelValue?: string;
	options: NativeSelectOption[];
}

defineEmits<{
	(e: 'update:modelValue', value: string): void;
}>();

const props = withDefaults(defineProps<NativeSelectProps>(), {
	variant: 'contained',
	size: 'medium',
	invalid: false,
	disabled: false,
});

const theID = props.id ?? nanoid();

function selectInput(event: Event): string | null {
	const target = event.target as HTMLSelectElement | null;
	return target?.value ?? null;
}
</script>

<script lang="ts">
export default {
	inheritAttrs: false,
};
</script>

<template>
	<div :class="[InputStyle.wrapper, $attrs.class]" :fullwidth="fullwidth ? '' : null">
		<InputLabel :for="theID" v-if="label" :label="label" :asterisk="asterisk" />
		<p v-if="$slots.description" :class="TypographyStyle.helper_text">
			<slot name="description" />
		</p>
		<select
			:id="theID"
			:invalid="invalid || Boolean($slots.errorMessage) ? '' : null"
			:disabled="disabled"
			:focused="focused ? '' : null"
			:fullwidth="fullwidth ? '' : null"
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
