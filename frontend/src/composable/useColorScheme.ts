import { ref, watch, type Ref } from 'vue';
import type { ColorScheme } from '@/config/constant';
import {
	applyColorScheme,
	getColorScheme,
	getColorSchemeMetaElement,
} from '@/function/StyleModule';

export function useColorScheme(): Ref<ColorScheme> {
	const metaElement = getColorSchemeMetaElement();
	const colorScheme = ref<ColorScheme>(getColorScheme(metaElement));

	watch(colorScheme, (colorScheme: ColorScheme) => {
		applyColorScheme(colorScheme, metaElement);
	});

	return colorScheme;
}
