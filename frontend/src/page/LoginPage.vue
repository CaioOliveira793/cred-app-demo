<script setup lang="ts">
import VButton from '@/component/form/VButton.vue';
import VInput from '@/component/form/VInput.vue';
import { TextInputTransform } from '@/composable/InputTransform';
import { useForm, useFieldBinding } from '@/composable/useFinalForm';
import { useUserAccount } from '@/composable/useUserAccount';
import { AppPath } from '@/config/constant';
import type { UserCredential } from '@/resource/IAM';
import { UserCredentialSchema } from '@/validation/IAM';
import { zodFormAdapter } from '@/validation/ZodHelper';
import { useRouter } from 'vue-router';

const router = useRouter();
const { authenticate } = useUserAccount();
const formApi = useForm<UserCredential>({
	submit: signIn,
	validate: zodFormAdapter(UserCredentialSchema),
});

const email = useFieldBinding({ name: 'email', formApi, transformer: TextInputTransform });
const password = useFieldBinding({ name: 'password', formApi, transformer: TextInputTransform });

async function signIn(credential: UserCredential) {
	const res = await authenticate(credential);
	if (res instanceof Error) {
		return;
	}

	await signInNavigation();
}

function signInNavigation() {
	const redirectPath = router.currentRoute.value.query.redirect_to;

	if (typeof redirectPath === 'string' && redirectPath[0] === '/') {
		return router.push({ path: redirectPath });
	}

	return router.push({ path: AppPath.Home });
}
</script>

<template>
	<main :class="$style.page_container">
		<form @submit.prevent="formApi.submit" :class="$style.form_container">
			<VInput
				type="email"
				inputmode="email"
				required
				v-bind="email.prop"
				v-on="email.event"
			></VInput>
			<p v-for="message in email.errors" :key="message">{{ message }}</p>
			<VInput type="password" required v-bind="password.prop" v-on="password.event"></VInput>
			<p v-for="message in password.errors" :key="message">{{ message }}</p>
			<VButton variant="contained" color="primary" size="medium" type="submit">Login</VButton>
		</form>
	</main>
</template>

<style module>
.page_container {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	height: 100%;
}

.form_container {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	gap: calc(var(--spacing-unit) * 1);
}
</style>
