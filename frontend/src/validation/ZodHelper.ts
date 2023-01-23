import type { ZodType } from 'zod';

type AllKeys<T> = T extends any ? keyof T : never;
type ZodFieldError<T> = { [P in AllKeys<T>]?: string[] | undefined };

export async function zodFormValidation<T, Schema extends ZodType<T>>(
	schema: Schema,
	data: T
): Promise<ZodFieldError<T>> {
	const result = await schema.safeParseAsync(data, { async: true });

	if (!result.success) {
		const error = result.error.formErrors.fieldErrors;
		return error;
	} else {
		return {};
	}
}

export type ZodFormValidator<T> = (data: T) => Promise<ZodFieldError<T>>;

export function zodFormAdapter<T, Schema extends ZodType<T>>(schema: Schema): ZodFormValidator<T> {
	return (data: T) => zodFormValidation(schema, data);
}
