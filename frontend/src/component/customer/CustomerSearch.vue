<script setup lang="ts">
import type { FormApi } from 'final-form';
import MagnifyingGlassIcon from '~icons/fa6-solid/magnifying-glass';
import PlusIcon from '~icons/fa6-solid/plus';
import TextInput from '@/component/form/TextInput.vue';
import VButton from '@/component/form/VButton.vue';
import ErrorMessageList from '@/component/form/ErrorMessageList.vue';
import { useFieldBind } from '@/composable/useFinalForm';
import { TextInputTransform } from '@/composable/InputTransform';
import type { CustomerQueryParams } from '@/resource/Customer';

export interface CustomerSearchProps {
	formApi: FormApi<CustomerQueryParams>;
}

const props = defineProps<CustomerSearchProps>();

const name = useFieldBind({
	name: 'name',
	formApi: props.formApi,
	transformer: TextInputTransform,
});
</script>

<template>
	<form :class="$style.search_container" @submit.prevent="formApi.submit">
		<div :class="$style.search_input_container">
			<TextInput
				placeholder="Cliente"
				type="text"
				variant="outlined"
				fullwidth
				v-bind="name.prop"
				v-on="name.event"
			>
				<template #startAdornment>
					<MagnifyingGlassIcon />
				</template>
				<template #errorMessage>
					<ErrorMessageList :errors="name.errors" />
				</template>
			</TextInput>
			<VButton type="button" variant="outlined" color="info">
				<template #start-icon>
					<PlusIcon />
				</template>
				Adicionar filtro
			</VButton>
		</div>

		<div :class="$style.search_button_container">
			<VButton type="reset" variant="outlined" color="warning" @click="formApi.reset">
				Limpar
			</VButton>
			<VButton type="submit" variant="contained" color="success">Buscar</VButton>
		</div>
	</form>
</template>

<style module>
.search_container {
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: flex-start;
	gap: calc(var(--spacing-unit) * 1);
	width: 100%;
}

.search_input_container {
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	align-items: flex-start;
	gap: calc(var(--spacing-unit) * 1.5);
	width: 100%;
}

.search_button_container {
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-end;
	align-items: center;
	gap: calc(var(--spacing-unit) * 2);
	width: 100%;
}
</style>
