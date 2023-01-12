<script setup lang="ts">
import { nanoid } from 'nanoid';

interface RangeInputProps {
	id?: string;
	min: number;
	max: number;
	step: number;

	label?: string;
	helperText?: string;
	size?: 'small' | 'medium' | 'large';
	color?: 'primary' | 'info' | 'success' | 'warning' | 'error';
}

// TODO: add color
// TODO: add states: disabled, focus, active, hover

withDefaults(defineProps<RangeInputProps>(), {
	id: nanoid(),
	size: 'medium',
	color: 'primary',
});
</script>

<template>
	<div :class="$style.input_wrapper">
		<label :for="id" v-if="label">{{ label }}</label>
		<input
			type="range"
			:class="$style.range_input"
			:style-size="size"
			:style-color="size"
			:id="id"
			:min="min"
			:max="max"
			:step="step"
			v-bind="$attrs"
		/>
		<p>{{ helperText }}</p>
	</div>
</template>

<style module>
.input_wrapper {
	display: flex;
	flex-flow: column nowrap;
	gap: var(--spacing-unit);
}

.range_input {
	width: 100%;
}

.range_input::track {
	border-radius: var(--full-border-radius);
	border: none;
	background: var(--surface-color-3);
}
.range_input::-webkit-slider-runnable-track {
	border-radius: var(--full-border-radius);
	border: none;
	background: var(--surface-color-3);
}
.range_input::-moz-range-track {
	border-radius: var(--full-border-radius);
	border: none;
	background: var(--surface-color-3);
}

.range_input::thumb {
	appearance: none;
	border-radius: var(--full-border-radius);
	background: var(--text-color-2);
	cursor: pointer;
}
.range_input::-webkit-slider-thumb {
	appearance: none;
	-webkit-appearance: none;
	border-radius: var(--full-border-radius);
	background: var(--text-color-2);
	cursor: pointer;
}
.range_input::-moz-range-thumb {
	appearance: none;
	border-radius: var(--full-border-radius);
	background: var(--text-color-2);
	cursor: pointer;
}
.range_input::-ms-thumb {
	appearance: none;
	border-radius: var(--full-border-radius);
	background: var(--text-color-2);
	cursor: pointer;
}

/* size */

.range_input[style-size='small'] {
	--track-height: 0.4rem;
	--thumb-size: 0.7rem;
}

.range_input[style-size='medium'] {
	--track-height: 0.7rem;
	--thumb-size: 1rem;
}

.range_input[style-size='large'] {
	--track-height: 1rem;
	--thumb-size: 1.3rem;
}

.range_input::track {
	height: var(--track-height);
}
.range_input::thumb {
	width: var(--thumb-size);
	height: var(--thumb-size);
}

.range_input::-webkit-slider-runnable-track {
	height: var(--track-height);
}
.range_input::-webkit-slider-thumb {
	width: var(--thumb-size);
	height: var(--thumb-size);
	margin-top: calc((var(--track-height) / 2) - (var(--thumb-size) / 2));
}

.range_input::-moz-range-track {
	height: var(--track-height);
}
.range_input::-moz-range-thumb {
	width: var(--thumb-size);
	height: var(--thumb-size);
}

.range_input::-ms-track {
	height: var(--track-height);
}
.range_input::-ms-thumb {
	width: var(--thumb-size);
	height: var(--thumb-size);
}

/* focus-visible */

.range_input:focus {
	outline: none;
}

.range_input:focus-visible::thumb {
	outline: var(--outline-color) var(--outline-style) var(--outline-width);
	outline-offset: var(--outline-offset);
}

.range_input:focus-visible::-webkit-slider-thumb {
	outline: var(--outline-color) var(--outline-style) var(--outline-width);
	outline-offset: var(--outline-offset);
}

.range_input:focus-visible::-moz-range-thumb {
	outline: var(--outline-color) var(--outline-style) var(--outline-width);
	outline-offset: var(--outline-offset);
}

.range_input:focus-visible::-ms-thumb {
	outline: var(--outline-color) var(--outline-style) var(--outline-width);
	outline-offset: var(--outline-offset);
}
</style>
