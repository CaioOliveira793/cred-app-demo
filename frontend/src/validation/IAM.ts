import { z } from 'zod';

const PrimitiveValidationConfig = {
	invalid_type_error: 'campo invalido',
	required_error: 'campo obrigatório',
	description: 'Field validation',
};

const EmailSchema = z.string(PrimitiveValidationConfig).email({ message: 'e-mail inválido' });

const PasswordSchema = z
	.string(PrimitiveValidationConfig)
	.min(8, { message: 'mínimo de 8 caracteres' });

export const UserCredentialSchema = z.object({
	email: EmailSchema,
	password: PasswordSchema,
});
