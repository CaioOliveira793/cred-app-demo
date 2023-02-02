<script setup lang="ts">
import { nanoid } from 'nanoid';
import InputStyle from '@/style/form/Input.module.css';
import TypographyStyle from '@/style/Typography.module.css';
import InputLabel from '@/component/form/InputLabel.vue';
import VInput, { type InputSize, type InputVariant } from '@/component/form/VInput.vue';

export interface TextInputProps {
	id?: string;

	// InputLabelProps
	label?: string;
	asterisk?: boolean;

	// InputProps
	type?: string;
	variant?: InputVariant;
	size?: InputSize;
	invalid?: boolean;
	focused?: boolean;
	disabled?: boolean;
	loading?: boolean;
	fullwidth?: boolean;
	required?: boolean;

	modelValue?: string;
}

defineEmits<{
	(e: 'update:modelValue', value: string): void;
}>();

const props = withDefaults(defineProps<TextInputProps>(), {
	variant: 'contained',
	size: 'medium',
	focused: false,
	disabled: false,
	invalid: false,
});

const theID = props.id ?? nanoid();
</script>

<template>
	<div :class="[InputStyle.wrapper, $attrs.class]" :fullwidth="fullwidth ? '' : null">
		<InputLabel :for="theID" v-if="label" :label="label" :asterisk="asterisk || required" />
		<p v-if="$slots.description" :class="TypographyStyle.helper_text">
			<slot name="description" />
		</p>
		<VInput
			:id="theID"
			:type="type"
			:variant="variant"
			:size="size"
			:focused="focused"
			:disabled="disabled"
			:required="required"
			:loading="loading"
			:fullwidth="fullwidth"
			:invalid="invalid"
			:value="modelValue"
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
			v-bind="$attrs"
		>
			<template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
				<slot :name="slot" v-bind="scope" />
			</template>
		</VInput>
		<p v-if="$slots.helperText" :class="TypographyStyle.helper_text">
			<slot name="helperText" />
		</p>
		<p v-if="$slots.errorMessage" role="alert" :class="TypographyStyle.error_message">
			<slot name="errorMessage" />
		</p>
	</div>
</template>

<script lang="ts">
export default {
	inheritAttrs: false,
};
</script>
