<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
	type ChangeClientRectRequestEventName,
	ChangeClientRectRequestEvent,
} from '@/event/LayoutEvent';
import { useUserAccount } from '@/composable/useUserAccount';
import MagnifyingGlassIcon from '~icons/fa6-solid/magnifying-glass';
import BarsIcon from '~icons/fa6-solid/bars';
import BellIcon from '~icons/fa6-solid/bell';
import VInput from '@/component/form/VInput.vue';
import VButton from '@/component/form/VButton.vue';
import UserProfile from '@/component/user/UserProfile.vue';

const TOP_BAR_HEIGHT = 48;

const topNavEl = ref<null | HTMLElement>(null);

const { user } = useUserAccount();

const emit = defineEmits<{
	(name: ChangeClientRectRequestEventName, event: ChangeClientRectRequestEvent): void;
}>();

function createExpectedRect(currentRect: DOMRect): DOMRect {
	return new DOMRect(currentRect.x, currentRect.y, currentRect.width, TOP_BAR_HEIGHT);
}

onMounted(() => {
	if (topNavEl.value === null) return;

	const currentRect = topNavEl.value.getBoundingClientRect();

	emit(
		ChangeClientRectRequestEvent.EVENT_NAME,
		new ChangeClientRectRequestEvent(
			currentRect,
			createExpectedRect(currentRect),
			topNavEl.value,
			null
		)
	);
});
</script>

<template>
	<div :class="$style.container" ref="topNavEl">
		<div :class="$style.search_container">
			<VButton variant="icon_flat" color="current" size="medium">
				<BarsIcon />
			</VButton>

			<strong :class="$style.app_name">CredApp</strong>

			<VInput
				type="search"
				variant="outlined"
				size="medium"
				placeholder="Search"
				:wrapperAttrs="{ class: $style.search_input }"
			>
				<template #startAdornment>
					<MagnifyingGlassIcon />
				</template>
				<template #endAdornment>
					<pre :class="$style.shortcut">Ctrl + K</pre>
				</template>
			</VInput>

			<VButton variant="icon_flat" color="current" size="medium" :class="$style.search_icon">
				<MagnifyingGlassIcon />
			</VButton>
		</div>

		<div :class="$style.user_container">
			<VButton variant="icon_flat" color="current" size="medium">
				<BellIcon />
			</VButton>

			<UserProfile :user="user" />
		</div>
	</div>
</template>

<style module>
.container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	padding: 0 calc(var(--padding-unit) * 2);
	gap: calc(var(--spacing-unit) * 4);

	border-bottom: thin solid var(--divider-color);
	background-color: var(--surface-color-3);
}

.search_container,
.user_container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
}
.search_container {
	width: 100%;
	gap: calc(var(--spacing-unit) * 4);
}
.user_container {
	gap: calc(var(--spacing-unit) * 1);
}

.search_input {
	min-width: 16rem;
	width: 100%;
	max-width: 32rem;
}

.search_icon {
	display: none;
}

.shortcut {
	composes: caption from '@/style/Typography.module.css';
}

@media screen and (560px > width) {
	.app_name {
		display: none;
	}

	.search_container {
		gap: calc(var(--spacing-unit) * 2);
	}
}

@media screen and (460px > width) {
	.search_input {
		display: none;
	}

	.search_icon {
		display: flex;
	}
}
</style>
