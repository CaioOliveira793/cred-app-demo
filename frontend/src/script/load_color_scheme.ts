import {
	applyColorScheme,
	getColorScheme,
	getColorSchemeMetaElement,
	persistColorScheme,
} from '@/helper/StyleHelper';

const metaElement = getColorSchemeMetaElement();
const colorScheme = getColorScheme(metaElement);

persistColorScheme(colorScheme);
applyColorScheme(colorScheme, metaElement);
