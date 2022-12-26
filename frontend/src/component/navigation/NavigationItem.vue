<script setup lang="ts">
import type { Component, VNode } from 'vue';
import SquareCaretRightIcon from '~icons/fa6-solid/square-caret-right';

defineProps<{
	name?: string;
	expanded?: boolean;
	selected?: boolean;
	ItemComponent: 'a' | 'button' | Component | VNode | (() => VNode);
}>();
</script>

<template>
	<li :class="$style.menu_item" role="menuitem">
		<component
			:class="{ [$style.navigation_item]: true, [$style.selected_navigation_item]: selected }"
			:is="ItemComponent"
			v-bind="$attrs"
		>
			<slot name="icon">
				<SquareCaretRightIcon />
			</slot>
			<span v-if="expanded ?? false">{{ name }}</span>
		</component>
	</li>
</template>

<style module>
.menu_item {
	display: flex;
}

.navigation_item {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	padding: calc(var(--global-padding-unit) * 1) calc(var(--global-padding-unit) * 1);
	gap: calc(var(--global-spacing-unit) * 1.5);
	border-radius: var(--global-border-radius-unit);
	width: 100%;
	color: var(--text-color-1);
}

.selected_navigation_item {
	background-color: var(--global-action-select-color);
}

.navigation_item:hover {
	color: var(--brand-color);
	background-color: var(--surface-color-4);
}
</style>
