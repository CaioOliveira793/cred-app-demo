<script setup lang="ts">
interface User {
	image_url: string;
	name: string;
	email: string;
}

interface UserProfileProps {
	user: User;
	expanded?: boolean;
}

defineProps<UserProfileProps>();
</script>

<template>
	<div :class="{ [$style.user_profile]: true, [$style.expanded_user_profile]: expanded }">
		<img :class="$style.user_image" :src="user.image_url" alt="user_image" />
		<div :class="$style.user_profile_info" v-show="expanded">
			<strong :class="$style.user_name">{{ user.name }}</strong>
			<a :href="'mailto:' + user.email" :class="$style.user_email">{{ user.email }}</a>
		</div>
	</div>
</template>

<style module>
.user_profile {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: calc(var(--spacing-unit) * 1);
	width: 100%;
	border-radius: calc(var(--border-radius-unit) * 1);
}

.expanded_user_profile {
	padding: calc(var(--padding-unit) * 1) calc(var(--padding-unit) * 1);
	background-color: var(--surface-color-3);
}

.user_profile_info {
	display: flex;
	flex-flow: column nowrap;
}

.user_image {
	width: 2em;
	height: 2em;
	object-fit: cover;
	border-radius: 999999px;
	aspect-ratio: 1 / 1;
}

.user_name {
	composes: body1 from '@/style/Typography.module.css';
}

.user_email {
	composes: body2 from '@/style/Typography.module.css';
}
</style>
