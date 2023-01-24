<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import ArrowLeftIcon from '~icons/fa6-solid/arrow-left';
import ArrowRightIcon from '~icons/fa6-solid/arrow-right';
import NavigationItem from '@/component/navigation/NavigationItem.vue';
import AppLogo from '@/component/AppLogo.vue';
import UserProfile from '@/component/user/UserProfile.vue';
import VButton from '@/component/form/VButton.vue';
import { useUserAccount } from '@/composable/useUserAccount';
import { useAppLayout } from '@/composable/useAppLayout';
import { DownNavigationItems, UpNavigationItems } from './NavItems';

const EXPANDED_WIDTH = 240;
const CONTAINED_WIDTH = 64;

const route = useRoute();
const { setSidebarWidth } = useAppLayout();
const { user } = useUserAccount();

const expanded = ref(false);

setSidebarWidth(expanded.value ? EXPANDED_WIDTH : CONTAINED_WIDTH);

function handleExpand() {
	expanded.value = !expanded.value;
	setSidebarWidth(expanded.value ? EXPANDED_WIDTH : CONTAINED_WIDTH);
}
</script>

<template>
	<aside :class="$style.app_sidebar" :expanded="expanded ? '' : null">
		<div :class="$style.nav_header">
			<AppLogo :landscape="expanded" :class="$style.logo" />
			<VButton
				variant="icon_flat"
				size="medium"
				aria-label="left-sidebar-menu"
				:class="{ [$style.expanded_button]: expanded }"
				@click="handleExpand"
			>
				<ArrowLeftIcon v-if="expanded" />
				<ArrowRightIcon v-if="!expanded" />
			</VButton>
		</div>
		<hr />
		<nav :class="$style.navigation">
			<ul>
				<NavigationItem
					v-for="{ name, path, icon } in UpNavigationItems"
					:key="path"
					:name="name"
					:expanded="expanded"
					:selected="route.path === path"
					ItemComponent="router-link"
					:to="path"
				>
					<template #icon>
						<component :is="icon" />
					</template>
				</NavigationItem>
			</ul>
			<ul>
				<NavigationItem
					v-for="{ name, path, icon } in DownNavigationItems"
					:key="path"
					:name="name"
					:expanded="expanded"
					:selected="route.path === path"
					ItemComponent="router-link"
					:to="path"
				>
					<template #icon>
						<component :is="icon" />
					</template>
				</NavigationItem>
			</ul>
		</nav>
		<hr />
		<UserProfile :user="user" :expanded="expanded" />
	</aside>
</template>

<style module>
.app_sidebar {
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-between;
	align-items: center;
	padding: calc(var(--padding-unit) * 2);
	gap: calc(var(--spacing-unit) * 2);
	background-color: var(--surface-color-2);
}

.app_sidebar nav,
.app_sidebar nav ul {
	width: 100%;
}

.nav_header {
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-between;
	align-items: center;
	gap: calc(var(--spacing-unit) * 2);
	width: 100%;
}

.logo {
	align-self: flex-start;
}

.expanded_button {
	align-self: flex-end;
}

.navigation {
	display: flex;
	flex-flow: column wrap;
	justify-content: space-between;
	align-items: flex-start;
	height: 100%;

	composes: body1 from '@/style/Typography.module.css';
}
</style>
