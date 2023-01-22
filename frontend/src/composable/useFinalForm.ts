import {
	createForm,
	formSubscriptionItems,
	type FieldConfig,
	type FieldState,
	type FieldSubscription,
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

export type FinalValidate<ValidationError> = () => Promise<ValidationError | void>;

export interface UseFormInput<Data extends object, ValidationError extends object> {
	submit: FinalSubmit<Data>;

	validate?: FinalValidate<ValidationError>;

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

export const DefaultFieldSubscription: FieldSubscription = Object.fromEntries(
	formSubscriptionItems.map(key => [key, true])
);

export interface FieldPropBindind {
	checked?: boolean;
	value?: string;
	invalid: boolean;
	name: string;
}

export interface FieldEventBinding {
	blur(): void;
	input(ev: Event): void;
	focus(): void;
}

export interface FieldBindind {
	event?: FieldEventBinding;
	prop?: FieldPropBindind;
}

export function emptyFieldBindind(): FieldBindind {
	return {
		event: undefined,
		prop: undefined,
	};
}

export function fieldBinding<Input extends InputData, FieldValue extends CoercedInputData>(
	state: FieldState<FieldValue>,
	transformer: InputTransform<Input, FieldValue>
): FieldBindind {
	function handleInput(ev: Event): void {
		const target = ev.target as HTMLInputElement;
		state.change(transformer.from(target));
	}

	const inputValue = transformer.into(state.value);

	const event: FieldEventBinding = {
		blur: state.blur,
		input: handleInput,
		focus: state.focus,
	};

	const prop: FieldPropBindind = {
		invalid: state.touched && state.invalid ? true : false,
		name: state.name,
	};

	if (typeof inputValue === 'boolean') {
		prop.checked = inputValue;
	}

	if (typeof inputValue === 'string') {
		prop.value = inputValue;
	}

	return { prop, event };
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
export function useFieldBinding<
	Data extends object,
	Field extends keyof Data,
	Input extends InputData,
	FieldValue extends Data[Field] & CoercedInputData
>({
	name,
	formApi,
	transformer,
	fieldConfig,
}: UseFieldBinding<Data, Field, Input, FieldValue>): FieldBindind {
	const binding = reactive<FieldBindind>(emptyFieldBindind());

	const unregister = formApi.registerField(
		name,
		state => {
			const { event, prop } = fieldBinding(state as FieldState<FieldValue>, transformer);
			binding.event = event;
			binding.prop = prop;
		},
		{
			value: true,
			touched: true,
		},
		fieldConfig
	);

	onUnmounted(unregister);

	return binding;
}
