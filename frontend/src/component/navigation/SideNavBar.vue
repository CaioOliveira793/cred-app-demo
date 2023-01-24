<script setup lang="ts">
import { useRoute } from 'vue-router';
import NavigationItem from '@/component/navigation/NavigationItem.vue';
import AppLogo from '@/component/AppLogo.vue';
import UserProfile from '@/component/user/UserProfile.vue';
import { useUserAccount } from '@/composable/useUserAccount';
import { DownNavigationItems, UpNavigationItems } from './NavItems';

interface SideNavBarProps {
	expanded: boolean;
}

const route = useRoute();
const { user } = useUserAccount();

withDefaults(defineProps<SideNavBarProps>(), {
	expanded: false,
});
</script>

<template>
	<aside :class="$style.app_sidebar" :expanded="expanded ? '' : null">
		<div :class="$style.nav_header">
			<AppLogo :landscape="expanded" :class="$style.logo" />
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

.navigation {
	display: flex;
	flex-flow: column wrap;
	justify-content: space-between;
	align-items: flex-start;
	height: 100%;

	composes: body1 from '@/style/Typography.module.css';
}
</style>
