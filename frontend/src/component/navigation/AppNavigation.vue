<script setup lang="ts">
import { ref } from 'vue';
import NavigationItem from '@/component/navigation/NavigationItem.vue';
import AppLogo from '../AppLogo.vue';
import UserProfileLandscape from '../user/UserProfileLandscape.vue';

import ArrowLeftIcon from '~icons/fa6-solid/arrow-left';
import ArrowRightIcon from '~icons/fa6-solid/arrow-right';
import HouseIcon from '~icons/fa6-solid/house';
import UserTagIcon from '~icons/fa6-solid/user-tag';
import ClipboardListIcon from '~icons/fa6-solid/clipboard-list';
import CommentsIcon from '~icons/fa6-solid/comments';
import GearIcon from '~icons/fa6-solid/gear';

const expanded = ref(false);

function toggleExpanded() {
	expanded.value = !expanded.value;
}

const user = {
	name: 'Victoria Alexandrova',
	email: 'vic@gmail.com',
	image_url:
		'https://images.unsplash.com/photo-1671041014656-1c9cbd170653?ixlib=rb-4.0.3&dl=victoria-alexandrova-ZAr6q61nVww-unsplash.jpg&w=2400&q=80&fm=jpg&crop=entropy&cs=tinysrgb',
};
</script>

<template>
	<aside class="app_side_bar" :class="{ expanded_side_bar: expanded }">
		<div class="app_nav_header">
			<AppLogo :landscape="expanded" class="logo" />
			<ArrowLeftIcon v-if="expanded" @click="toggleExpanded" class="expanded_button" />
			<ArrowRightIcon v-if="!expanded" @click="toggleExpanded" />
		</div>
		<hr />
		<nav class="app_navigation" :class="{ expanded_navigation: expanded }">
			<ul>
				<NavigationItem name="Home" :expanded="expanded" ItemComponent="a">
					<template #icon>
						<HouseIcon />
					</template>
				</NavigationItem>
				<NavigationItem name="Clientes" :expanded="expanded" ItemComponent="a">
					<template #icon>
						<UserTagIcon />
					</template>
				</NavigationItem>
				<NavigationItem name="Campanhas" :expanded="expanded" ItemComponent="a">
					<template #icon>
						<ClipboardListIcon />
					</template>
				</NavigationItem>
				<NavigationItem name="Atendimentos" :expanded="expanded" ItemComponent="a">
					<template #icon>
						<CommentsIcon />
					</template>
				</NavigationItem>
			</ul>
			<ul>
				<NavigationItem name="Configurações" :expanded="expanded" ItemComponent="a">
					<template #icon>
						<GearIcon />
					</template>
				</NavigationItem>
			</ul>
		</nav>
		<hr />
		<UserProfileLandscape :user="user" :expanded="expanded" />
	</aside>
</template>

<style scoped>
.app_side_bar {
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-between;
	align-items: center;
	padding: calc(var(--global-padding-unit) * 3) calc(var(--global-padding-unit) * 2);
	gap: calc(var(--global-spacing-unit) * 2);
	background-color: var(--global-bg-emphasis-color);
}

.expanded_side_bar {
	max-width: 240px;
	width: 100%;
}

.app_nav_header {
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-between;
	align-items: center;
	gap: calc(var(--global-spacing-unit) * 2);
	width: 100%;
}

.logo {
	align-self: flex-start;
}

.expanded_button {
	align-self: flex-end;
}

.app_navigation {
	display: flex;
	flex-flow: column wrap;
	justify-content: space-between;
	align-items: flex-start;
	height: 100%;
}

.expanded_navigation,
.expanded_navigation ul {
	width: 100%;
}
</style>
