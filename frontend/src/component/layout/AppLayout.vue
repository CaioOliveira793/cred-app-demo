<script setup lang="ts">
import {
	TOP_NAVIGATION_ELEMENT_ID,
	LEFT_SIDEBAR_ELEMENT_ID,
	MAIN_CONTENT_ELEMENT_ID,
} from '@/config/constant';
import { CSSpx } from '@/function/StyleModule';
import { useAppLayout } from '@/composable/useAppLayout';

const { layout, visibleSidebarWidth } = useAppLayout();
</script>

<script lang="ts">
export default {
	inheritAttrs: false,
};
</script>

<template>
	<router-view
		:name="TOP_NAVIGATION_ELEMENT_ID"
		:id="TOP_NAVIGATION_ELEMENT_ID"
		:class="$style.top_navigation"
	/>
	<router-view
		:name="LEFT_SIDEBAR_ELEMENT_ID"
		:id="LEFT_SIDEBAR_ELEMENT_ID"
		:class="$style.left_sidebar"
		v-show="layout.sidebarVisible"
	/>
	<router-view
		:name="MAIN_CONTENT_ELEMENT_ID"
		:id="MAIN_CONTENT_ELEMENT_ID"
		:class="$style.app_content"
		v-bind="$attrs"
	/>
</template>

<style>
#app {
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: stretch;
	min-height: 100vh;
}
</style>

<style module>
.top_navigation {
	position: fixed;
	height: v-bind('CSSpx(layout.appBarHeight)');
	width: 100%;
	z-index: var(--index-layer-2);
}

.left_sidebar {
	position: fixed;
	overflow-y: auto;
	width: v-bind('CSSpx(visibleSidebarWidth())');
	height: calc(100% - v-bind('CSSpx(layout.appBarHeight)'));
	top: v-bind('CSSpx(layout.appBarHeight)');
}

.app_content {
	position: relative;
	display: flex;
	flex-direction: column;
	padding: calc(var(--padding-unit) * 4);
	gap: calc(var(--padding-unit) * 4);
	width: calc(100% - v-bind('CSSpx(visibleSidebarWidth())'));
	min-height: 100%;

	top: v-bind('CSSpx(layout.appBarHeight)');
	left: v-bind('CSSpx(visibleSidebarWidth())');
}
</style>
