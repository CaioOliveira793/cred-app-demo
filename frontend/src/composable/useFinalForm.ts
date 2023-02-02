import {
	createForm,
	formSubscriptionItems,
	type FieldConfig,
	type FieldState,
	type FormApi,
	type FormSubscription,
	type SubmissionErrors,
} from 'final-form';
import { onUnmounted, reactive } from 'vue';
import type { InputData, CoercedInputData, InputTransform } from '@/composable/InputTransform';

export type FinalSubmit<Data> = (
	values: Data,
	form: FormApi<Data, Partial<Data>>,
	callback?: (errors?: SubmissionErrors) => void
) => Promise<void>;

export type FinalValidate<Data extends object, ValidationError> = (
	values: Data
) => Promise<ValidationError | void>;

export interface UseFormInput<Data extends object, ValidationError extends object> {
	submit: FinalSubmit<Data>;

	validate?: FinalValidate<Data, ValidationError>;

	/**
	 * The initial values of your form. These will also be used to compare against the
	 * current values to calculate pristine and dirty.
	 */
	initialValues?: Partial<Data>;

	/**
	 * If true, validation will happen on blur. If false, validation will happen on change.
	 *
	 * @default true
	 */
	validateOnBlur?: boolean;

	/**
	 * If true, the value of a field will be destroyed when that field is unregistered.
	 *
	 * @default false
	 */
	destroyOnUnregister?: boolean;
}

export const DefaultFormSubscription: FormSubscription = Object.fromEntries(
	formSubscriptionItems.map(key => [key, true])
);

/**
 * Create a form controller.
 *
 * @param config Form api configuration.
 * @returns Reactive form api.
 */
export function useForm<Data extends object, ValidationError extends object = {}>({
	submit,
	validate = async () => {},
	initialValues = {},
	validateOnBlur = true,
	destroyOnUnregister = false,
}: UseFormInput<Data, ValidationError>): FormApi<Data> {
	const formApi = reactive(
		createForm<Data>({
			onSubmit: submit,
			validate,
			initialValues,
			validateOnBlur,
			destroyOnUnregister,
			keepDirtyOnReinitialize: false,
		})
	);

	return formApi;
}

export interface FieldPropBind {
	checked?: boolean;
	value?: string;
	invalid: boolean;
	name: string;
}

export interface FieldEventBind {
	blur(): void;
	input(ev: Event): void;
	focus(): void;
}

export interface FieldBind {
	event?: FieldEventBind;
	prop?: FieldPropBind;
	errors: string[];
}

export function emptyFieldBindind(): FieldBind {
	return {
		event: undefined,
		prop: undefined,
		errors: [],
	};
}

export function fieldBinding<Input extends InputData, FieldValue extends CoercedInputData>(
	state: FieldState<FieldValue>,
	transformer: InputTransform<Input, FieldValue>
): FieldBind {
	function handleInput(ev: Event): void {
		const target = ev.target as HTMLInputElement;
		state.change(transformer.from(target));
	}

	const inputValue = transformer.into(state.value);

	const event: FieldEventBind = {
		blur: state.blur,
		input: handleInput,
		focus: state.focus,
	};

	const prop: FieldPropBind = {
		invalid: state.touched && state.invalid ? true : false,
		name: state.name,
	};

	if (typeof inputValue === 'boolean') {
		prop.checked = inputValue;
	}

	if (typeof inputValue === 'string') {
		prop.value = inputValue;
	}

	// Since there's no generic way to type the error, lets assume it's a list of messages `string[]`
	const errors = (state.error as string[] | undefined) ?? [];

	return { prop, event, errors };
}

export interface UseFieldBinding<
	Data extends object,
	Field extends keyof Data,
	Input extends InputData,
	FieldValue extends Data[Field] & CoercedInputData
> {
	/** Field name */
	name: Field;

	/** Form api */
	formApi: FormApi<Data>;

	/** Field transformer */
	transformer: InputTransform<Input, FieldValue>;

	/** Field Config */
	fieldConfig?: FieldConfig<Data[Field]>;
}

/**
 * Create a bind object for a input.
 *
 * @param param Field bindind input.
 * @returns Reactive binding object.
 */
export function useFieldBind<
	Data extends object,
	Field extends keyof Data,
	Input extends InputData,
	FieldValue extends Data[Field] & CoercedInputData
>({
	name,
	formApi,
	transformer,
	fieldConfig,
}: UseFieldBinding<Data, Field, Input, FieldValue>): FieldBind {
	const binding = reactive<FieldBind>(emptyFieldBindind());

	const unregister = formApi.registerField(
		name,
		state => {
			const { event, prop, errors } = fieldBinding(state as FieldState<FieldValue>, transformer);
			binding.event = event;
			binding.prop = prop;
			binding.errors = errors;
		},
		{
			value: true,
			error: true,
			invalid: true,
			touched: true,
		},
		fieldConfig
	);

	onUnmounted(unregister);

	return binding;
}
