<script setup lang="ts">
import { ref } from 'vue';
import {
	TOP_NAVIGATION_ELEMENT_ID,
	LEFT_SIDEBAR_ELEMENT_ID,
	MAIN_CONTENT_ELEMENT_ID,
} from '@/config/constant';
import TopAppBar from '@/component/navigation/TopAppBar.vue';
import SideNavBar from '@/component/navigation/SideNavBar.vue';

const sidebarVisibility = ref<boolean>(false);
</script>

<script lang="ts">
export default {
	inheritAttrs: false,
};
</script>

<template>
	<TopAppBar
		:id="TOP_NAVIGATION_ELEMENT_ID"
		:class="$style.top_navigation"
		@toggle-sidebar="sidebarVisibility = !sidebarVisibility"
	/>
	<SideNavBar
		:id="LEFT_SIDEBAR_ELEMENT_ID"
		:class="$style.left_sidebar"
		:expanded="sidebarVisibility"
	/>
	<router-view
		:name="MAIN_CONTENT_ELEMENT_ID"
		:id="MAIN_CONTENT_ELEMENT_ID"
		:class="$style.app_content"
		v-bind="$attrs"
		:expanded="sidebarVisibility ? '' : null"
	/>
</template>

<style>
#app {
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: stretch;
	min-height: 100vh;

	--sidebar-expanded-width: 240px;
	--sidebar-contained-width: 64px;
	--top-bar-height: 48px;
}
</style>

<style module>
.top_navigation {
	position: fixed;
	width: 100%;
	height: var(--top-bar-height);
	z-index: var(--index-layer-2);
}

.left_sidebar {
	position: fixed;
	display: flex;
	flex-flow: column nowrap;
	overflow-y: auto;
	width: var(--sidebar-contained-width);
	height: calc(100% - var(--top-bar-height));
	z-index: var(--index-layer-2);

	top: var(--top-bar-height);
}
.left_sidebar[expanded] {
	width: var(--sidebar-expanded-width);
}

.app_content {
	position: relative;
	display: flex;
	flex-flow: column nowrap;
	padding: calc(var(--padding-unit) * 4);
	gap: calc(var(--padding-unit) * 4);
	width: calc(100% - var(--sidebar-contained-width));
	min-height: 100%;

	top: var(--top-bar-height);
	left: var(--sidebar-contained-width);
}
.app_content[expanded] {
	width: calc(100% - var(--sidebar-expanded-width));
	left: var(--sidebar-expanded-width);
}

@media screen and (640px > width) {
	.app_content[expanded] {
		left: var(--sidebar-contained-width);
		width: calc(100% - var(--sidebar-contained-width));
	}
}

@media screen and (400px > width) {
	.app_content {
		left: 0px;
		width: 100%;
	}

	.app_content[expanded] {
		left: 0px;
		width: 100%;
	}

	.left_sidebar {
		display: none;
	}

	.left_sidebar[expanded] {
		display: flex;
		width: 100vw;
	}
}
</style>
