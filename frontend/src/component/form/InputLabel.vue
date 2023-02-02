<script setup lang="ts">
import TypographyStyle from '@/style/Typography.module.css';

export interface InputLabelProps {
	label?: string;
	asterisk?: boolean;
}

defineProps<InputLabelProps>();
</script>

<template>
	<label :class="TypographyStyle.body2"
		>{{ asterisk ? label + ' ' : label }}
		<span v-if="asterisk" :class="$style.asterisk">*</span>
	</label>
</template>

<style module>
.asterisk {
	color: var(--failure-color);
}
</style>
