import { z } from 'zod';
import { DateValidationConfig, PrimitiveValidationConfig } from './ZodHelper';

export const CustomerQueryParamsSchema = z.object({
	name: z.string(PrimitiveValidationConfig).optional(),
	birthdate_start: z.date(DateValidationConfig).optional(),
	birthdate_end: z.date(DateValidationConfig).optional(),
	cpf: z.string(PrimitiveValidationConfig).optional(), // CPF validation
	convenios: z
		.array(z.string(PrimitiveValidationConfig), PrimitiveValidationConfig)
		.max(32, { message: 'máximo de 32 convênios' })
		.optional(),
});
