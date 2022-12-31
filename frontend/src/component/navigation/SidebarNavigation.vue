<script setup lang="ts">
import { ref, onMounted, type Component } from 'vue';
import { useRoute } from 'vue-router';
import NavigationItem from '@/component/navigation/NavigationItem.vue';
import AppLogo from '@/component/AppLogo.vue';
import UserProfileLandscape from '@/component/user/UserProfileLandscape.vue';
import VButton from '@/component/form/VButton.vue';
import {
	ChangeClientRectRequestEvent,
	type ChangeClientRectRequestEventName,
} from '@/event/LayoutEvent';

import ArrowLeftIcon from '~icons/fa6-solid/arrow-left';
import ArrowRightIcon from '~icons/fa6-solid/arrow-right';
import HouseIcon from '~icons/fa6-solid/house';
import UserTagIcon from '~icons/fa6-solid/user-tag';
import ClipboardListIcon from '~icons/fa6-solid/clipboard-list';
import CommentsIcon from '~icons/fa6-solid/comments';
import GearIcon from '~icons/fa6-solid/gear';

interface NavItem {
	path: string;
	name: string;
	icon: Component;
}

const EXPANDED_WIDTH = 240;
const CONTAINED_WIDTH = 64;

const UpNavigationItems: NavItem[] = [
	{
		name: 'Home',
		path: '/home',
		icon: HouseIcon,
	},
	{
		name: 'Clientes',
		path: '/customer',
		icon: UserTagIcon,
	},
	{
		name: 'Campanhas',
		path: '/campaign',
		icon: ClipboardListIcon,
	},
	{
		name: 'Atendimentos',
		path: '/customer_service',
		icon: CommentsIcon,
	},
];

const DownNavigationItems: NavItem[] = [
	{
		name: 'Configurações',
		path: '/config',
		icon: GearIcon,
	},
];

const user = {
	name: 'Victoria Alexandrova',
	email: 'vic@gmail.com',
	image_url:
		'https://images.unsplash.com/photo-1671041014656-1c9cbd170653?ixlib=rb-4.0.3&dl=victoria-alexandrova-ZAr6q61nVww-unsplash.jpg&w=2400&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
};

const route = useRoute();

const expanded = ref(false);
const sidebarEl = ref<null | HTMLElement>(null);

const emit = defineEmits<{
	(name: ChangeClientRectRequestEventName, event: ChangeClientRectRequestEvent): void;
}>();

function createExpectedRect(currentRect: DOMRect, expanded: boolean): DOMRect {
	return expanded
		? new DOMRect(currentRect.x, currentRect.y, EXPANDED_WIDTH, currentRect.height)
		: new DOMRect(currentRect.x, currentRect.y, CONTAINED_WIDTH, currentRect.height);
}

function handleExpand(event: MouseEvent) {
	expanded.value = !expanded.value;

	if (sidebarEl.value === null) return;

	const currentRect = sidebarEl.value.getBoundingClientRect();
	const expectedRect = createExpectedRect(currentRect, expanded.value);

	emit(
		ChangeClientRectRequestEvent.EVENT_NAME,
		new ChangeClientRectRequestEvent(currentRect, expectedRect, sidebarEl.value, event)
	);
}

onMounted(() => {
	if (sidebarEl.value === null) return;

	const currentRect = sidebarEl.value.getBoundingClientRect();

	emit(
		ChangeClientRectRequestEvent.EVENT_NAME,
		new ChangeClientRectRequestEvent(
			currentRect,
			createExpectedRect(currentRect, expanded.value),
			sidebarEl.value,
			null
		)
	);
});
</script>

<template>
	<aside :class="$style.app_sidebar" :expanded="expanded ? '' : null" ref="sidebarEl">
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
		<UserProfileLandscape :user="user" :expanded="expanded" />
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
