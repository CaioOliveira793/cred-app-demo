<script setup lang="ts">
import SquareCaretRightIcon from '~icons/fa6-solid/square-caret-right';

interface NavigationItem {
	name?: string;
	expanded?: boolean;
	selected?: boolean;
	disabled?: boolean;
	ItemComponent: 'a' | 'button' | 'router-link';
}

withDefaults(defineProps<NavigationItem>(), {
	disabled: false,
	expanded: false,
	selected: false,
});
</script>

<template>
	<li :class="$style.menu_item" :title="name">
		<component
			:class="$style.navigation_item"
			:is="ItemComponent"
			:disabled="disabled ? '' : null"
			:selected="selected ? '' : null"
			:aria-label="name"
			v-bind="$attrs"
		>
			<slot name="icon">
				<SquareCaretRightIcon />
			</slot>
			<span v-show="expanded">{{ name }}</span>
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
	padding: calc(var(--padding-unit) * 1) calc(var(--padding-unit) * 1);
	gap: calc(var(--spacing-unit) * 1.5);
	border-radius: var(--border-radius-unit);
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
