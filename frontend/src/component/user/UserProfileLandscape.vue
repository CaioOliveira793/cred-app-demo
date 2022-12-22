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
	<div class="user_profile" :class="{ expanded_user_profile: expanded }">
		<img class="user_image" :src="user.image_url" alt="user_image" />
		<div class="user_profile_info" v-show="expanded">
			<strong style="font-size: 12px">{{ user.name }}</strong>
			<a :href="'mailto:' + user.email" style="font-size: 12px">{{ user.email }}</a>
		</div>
	</div>
</template>

<style scoped>
.user_profile {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: calc(var(--global-spacing-unit) * 1);
	width: 100%;
	border-radius: calc(var(--global-border-radius-unit) * 1);
}

.expanded_user_profile {
	padding: calc(var(--global-padding-unit) * 1) calc(var(--global-padding-unit) * 1);
	background-color: var(--global-bg-muted-color);
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
</style>
