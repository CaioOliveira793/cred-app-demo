<script setup lang="ts">
import { useRouter } from 'vue-router';
import TextInput from '@/component/form/TextInput.vue';
import VButton from '@/component/form/VButton.vue';
import { TextInputTransform } from '@/composable/InputTransform';
import { useForm, useFieldBind } from '@/composable/useFinalForm';
import { useUserAccount } from '@/composable/useUserAccount';
import { zodFormAdapter } from '@/validation/ZodHelper';
import { UserCredentialSchema } from '@/validation/IAM';
import { AppPath } from '@/config/constant';
import type { UserCredential } from '@/resource/IAM';

const router = useRouter();
const { authenticate } = useUserAccount();
const formApi = useForm<UserCredential>({
	submit: signIn,
	validate: zodFormAdapter(UserCredentialSchema),
});

const email = useFieldBind({ name: 'email', formApi, transformer: TextInputTransform });
const password = useFieldBind({ name: 'password', formApi, transformer: TextInputTransform });

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
			<TextInput
				label="E-mail"
				type="email"
				inputmode="email"
				required
				fullwidth
				:errors="email.errors"
				v-bind="email.prop"
				v-on="email.event"
			/>
			<TextInput
				label="Senha"
				type="password"
				required
				fullwidth
				:errors="password.errors"
				v-bind="password.prop"
				v-on="password.event"
			/>
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
	min-height: 100vh;
	width: 100%;
	padding: 0px calc(var(--padding-unit) * 4);
}

.form_container {
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	gap: calc(var(--spacing-unit) * 1);
	max-width: 50%;
	width: 100%;
}
</style>
