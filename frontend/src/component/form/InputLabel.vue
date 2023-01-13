<script setup lang="ts">
import TypographyStyle from '@/style/Typography.module.css';

export interface InputLabel {
	label?: string;
	asterisk?: boolean;
}

defineProps<InputLabel>();
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
