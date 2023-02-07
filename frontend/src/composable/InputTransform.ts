export type CoercedInputData = string | boolean | number | Date | null;
export type InputData = boolean | string;

/**
 * Input value transformer.
 */
export interface InputTransform<
	out Input extends InputData,
	in out Output extends CoercedInputData
> {
	from(input: Readonly<HTMLInputElement>): Output;
	into(coerced?: Output): Input;
}

/**
 * Text input transform.
 *
 * Transforms a non-empty input value.
 */
export const TextInputTransform: InputTransform<string, string> = {
	from(input) {
		return input.value ? input.value : '';
	},
	into(coerced) {
		return coerced ? coerced : '';
	},
};
