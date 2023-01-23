<script setup lang="ts">
import UserIcon from '~icons/fa6-solid/user';
import type { User } from '@/resource/IAM';
import VButton from '../form/VButton.vue';

interface UserProfileProps {
	user: User;
	expanded?: boolean;
}

defineProps<UserProfileProps>();
</script>

<template>
	<div :class="{ [$style.user_profile]: true, [$style.expanded_user_profile]: expanded }">
		<button v-if="user.image_url" type="button" :class="$style.user_image_button">
			<img :class="$style.user_image" :src="user.image_url" alt="user_image" />
		</button>
		<VButton v-else variant="icon_flat" size="medium" color="current">
			<UserIcon />
		</VButton>
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

.user_image_button {
	display: flex;
	min-width: 2em;
	max-width: fit-content;
	background-color: transparent;
}

.user_image {
	min-width: 2em;
	min-height: 2em;
	max-width: fit-content;
	object-fit: cover;
	border-radius: var(--full-border-radius);
	aspect-ratio: 1 / 1;
}

.user_name {
	composes: body1 from '@/style/Typography.module.css';
}

.user_email {
	composes: body2 from '@/style/Typography.module.css';
}
</style>
