<script setup lang="ts">
import RangeInput from '@/component/form/RangeInput.vue';
import VButton from '@/component/form/VButton.vue';
import NativeSelect, { type NativeSelectOption } from '@/component/form/NativeSelect.vue';
import { COLOR_SCHEME_LIST } from '@/config/constant';
import { useAppColorScheme } from '@/composable/useAppColorScheme';
import { useUserAccount } from '@/composable/useUserAccount';
import { usePrivatePage } from '@/composable/useAppAccess';
import { DateTimeFormatter } from '@/formatter/DateTimeFormatter';
import { CSShsl } from '@/function/StyleModule';

const THEME_OPTION_LIST: NativeSelectOption[] = COLOR_SCHEME_LIST.map(theme => ({
	label: theme,
	value: theme,
}));

const { user } = useUserAccount();
usePrivatePage();

const appColor = useAppColorScheme();
</script>

<template>
	<main>
		<section v-if="user !== null" :class="$style.config_section">
			<h2>Conta</h2>
			<div :class="$style.sub_section">
				<p>Nome: {{ user.name }}</p>
				<p>E-mail: {{ user.email }}</p>
				<p>Telefone: {{ user.phone }}</p>
				<div :class="$style.action_container">
					<!-- Update name and phone -->
					<VButton color="info">Atualizar informações</VButton>
				</div>
			</div>

			<h3>Senha</h3>
			<div :class="$style.sub_section">
				<p>
					Ultima alteração de senha:
					<span>
						{{ DateTimeFormatter.format(user.last_password_change) }}
					</span>
				</p>
				<div :class="$style.action_container">
					<VButton>Alterar senha</VButton>
				</div>
			</div>
		</section>

		<hr v-if="user !== null" />

		<section :class="$style.config_section">
			<h2>Tema</h2>
			<div :class="[$style.sub_section, $style.input_gap]">
				<div :class="$style.theme_color_row">
					<RangeInput
						label="Cor principal"
						name="main_color"
						fullwidth
						:min="0"
						:max="256"
						:step="1"
						v-model="appColor.themeColor.hue"
					>
						<template #description>Hue da cor principal</template>
					</RangeInput>
					<div
						:class="$style.color_box"
						:style="{ backgroundColor: CSShsl(appColor.mixedThemeColor) }"
					/>
				</div>
				<NativeSelect
					label="Esquema de cores"
					asterisk
					name="color_scheme"
					fullwidth
					:options="THEME_OPTION_LIST"
					v-model="appColor.colorScheme"
				>
					<template #description>Tema da aplicação</template>
					<template #option="{ options }">
						<option
							v-for="option in options"
							:key="option.value"
							:value="option.value"
							:class="$style.color_scheme_option"
						>
							{{ option.label }}
						</option>
					</template>
				</NativeSelect>
			</div>
		</section>
	</main>
</template>

<style module>
.config_section {
	display: flex;
	flex-flow: column nowrap;
	gap: calc(var(--spacing-unit) * 2);
}

.sub_section {
	display: flex;
	flex-flow: column nowrap;
	gap: calc(var(--spacing-unit) * 1);
}

.action_container {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	gap: calc(var(--spacing-unit) * 1);
	width: 100%;
}

.theme_color_row {
	display: flex;
	flex-flow: row nowrap;
	justify-items: space-between;
	align-items: center;
	gap: calc(var(--spacing-unit) * 2);
	width: 100%;
}

.color_box {
	display: block;
	width: calc(var(--spacing-unit) * 8);
	height: calc(var(--spacing-unit) * 8);
	border-radius: calc(var(--border-radius-unit) * 2);
}

.color_scheme_option {
	text-transform: capitalize;
}

.input_gap {
	gap: calc(var(--spacing-unit) * 2);
}
</style>
