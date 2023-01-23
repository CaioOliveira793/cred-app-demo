<script setup lang="ts">
import { reactive } from 'vue';
import {
	TOP_NAVIGATION_ELEMENT_ID,
	LEFT_SIDEBAR_ELEMENT_ID,
	RIGHT_SIDEBAR_ELEMENT_ID,
	MAIN_CONTENT_ELEMENT_ID,
} from '@/config/constant';
import { CSSpx } from '@/function/StyleModule';

const layout = reactive({
	top_menu_height: '0px',
	left_sidebar_width: '0px',
	right_sidebar_width: '0px',
});
</script>

<template>
	<router-view
		:name="TOP_NAVIGATION_ELEMENT_ID"
		:id="TOP_NAVIGATION_ELEMENT_ID"
		:class="$style.top_navigation"
		@change-client-rect-request="layout.top_menu_height = CSSpx($event.expected.height)"
	/>
	<router-view
		:name="LEFT_SIDEBAR_ELEMENT_ID"
		:id="LEFT_SIDEBAR_ELEMENT_ID"
		:class="$style.left_sidebar"
		@change-client-rect-request="layout.left_sidebar_width = CSSpx($event.expected.width)"
	/>
	<router-view
		:name="MAIN_CONTENT_ELEMENT_ID"
		:id="MAIN_CONTENT_ELEMENT_ID"
		:class="$style.app_content"
	/>
	<router-view
		:name="RIGHT_SIDEBAR_ELEMENT_ID"
		:id="RIGHT_SIDEBAR_ELEMENT_ID"
		@change-client-rect-request="layout.right_sidebar_width = CSSpx($event.expected.width)"
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
	height: v-bind('layout.top_menu_height');
	width: 100%;
}

.left_sidebar,
.right_sidebar {
	position: fixed;
	overflow-y: auto;
	width: 100%;
	height: calc(100% - v-bind('layout.top_menu_height'));
	top: v-bind('layout.top_menu_height');
}

.left_sidebar {
	max-width: v-bind('layout.left_sidebar_width');
}

.right_sidebar {
	max-width: v-bind('layout.right_sidebar_width');
}

.app_content {
	display: flex;
	flex-direction: column;
	padding: calc(var(--padding-unit) * 4);
	gap: calc(var(--padding-unit) * 4);
	width: calc(100% - v-bind('layout.left_sidebar_width') - v-bind('layout.right_sidebar_width'));
	min-height: 100%;

	margin-top: v-bind('layout.top_menu_height');
	margin-left: v-bind('layout.left_sidebar_width');
	margin-right: v-bind('layout.right_sidebar_width');
}
</style>
