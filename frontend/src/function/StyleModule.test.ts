import { describe, it, expect } from 'vitest';
import { parseCSShsl, type ColorHSLA } from './StyleModule';

describe('CSS Unit', () => {
	it('parse hsl value', () => {
		const validHSLs = [
			'hsl(  30  59%  36% )',
			'hsla(  30     59%    36%   )',
			'hsla(30 59% 36%)',
			'hsl(30 59% 36%)',
			'hsla(30deg 59% 36%)',
			'hsl(30deg 59% 36%)',
			'hsl(   30deg   59%    36%   )',
			'hsla(   30deg   59%    36%   )',
			'hsl(  30  59%  36%  / 0%)',
			'hsla(  30     59%    36%    / 0%)',
			'hsla(30 59% 36% / 0%)',
			'hsl(30 59% 36% / 0%)',
			'hsla(30deg 59% 36% / 0%)',
			'hsl(30deg 59% 36% / 0%)',
			'hsl(   30deg   59%    36%    / 0%)',
			'hsla(   30deg   59%    36%    / 0%)',
		];

		for (const hslStr of validHSLs) {
			const hsl = parseCSShsl(hslStr);

			expect(hsl).not.toBeNull();
		}
	});

	it('not parse invalid hsl value', () => {
		const validHSLs = [
			'hsla(30 59 36%)',
			'hsl(30 59% 36)',
			'hsla(30deg 59% 36% /)',
			'hsl(30de 59% 36%)',
			'hslb(   30deg   59%    36%   )',
			'hs(   30deg   59%    36%   )',
			'hsl(  30  59% )',
		];

		for (const hslStr of validHSLs) {
			const hsl = parseCSShsl(hslStr);

			expect(hsl).toBeNull();
		}
	});

	it('parse the default hsl alpha channel as 100%', () => {
		const hslStr = 'hsl(30deg 59% 36%)';

		const hsl = parseCSShsl(hslStr);

		expect(hsl).toStrictEqual<ColorHSLA>({
			hue: 30,
			saturation: 59,
			lightness: 36,
			alpha: 100,
		});
	});
});
