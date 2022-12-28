<script setup lang="ts">
import type { Component, VNode } from 'vue';
import SquareCaretRightIcon from '~icons/fa6-solid/square-caret-right';

interface NavigationItem {
	name?: string;
	expanded?: boolean;
	selected?: boolean;
	disabled?: boolean;
	ItemComponent: 'a' | 'button' | Component | VNode | (() => VNode);
}

withDefaults(defineProps<NavigationItem>(), {
	disabled: false,
	expanded: false,
	selected: false,
});
</script>

<template>
	<li :class="$style.menu_item" role="menuitem">
		<component
			:class="{
				[$style.navigation_item]: true,
			}"
			:is="ItemComponent"
			:disabled="disabled ? '' : null"
			:aria-disabled="disabled"
			:selected="selected ? '' : null"
			:aria-selected="selected"
			v-bind="$attrs"
		>
			<slot name="icon">
				<SquareCaretRightIcon />
			</slot>
			<span v-if="expanded">{{ name }}</span>
		</component>
	</li>
</template>

<style module>
.menu_item {
	display: flex;
}

.navigation_item {
	--nav-item-bg-color: initial;
	--nav-item-color: var(--text-color-1);

	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	padding: calc(var(--global-padding-unit) * 1) calc(var(--global-padding-unit) * 1);
	gap: calc(var(--global-spacing-unit) * 1.5);
	border-radius: var(--global-border-radius-unit);
	width: 100%;
	color: var(--nav-item-color);
	background-color: var(--nav-item-bg-color);
}

.navigation_item[selected] {
	--nav-item-bg-color: var(--select-overlay);
}

.navigation_item:hover {
	--nav-item-bg-color: var(--hover-overlay);
	text-decoration: none;
}

.navigation_item:focus {
	--nav-item-bg-color: var(--focus-overlay);
}

.navigation_item:active {
	--nav-item-bg-color: var(--active-overlay);
}

.navigation_item:disabled,
.navigation_item[disabled] {
	cursor: default;
	pointer-events: none;
	--nav-item-color: var(--disable-overlay);
	--nav-item-bg-color: initial;
}
</style>
