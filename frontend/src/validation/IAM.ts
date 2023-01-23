import { z } from 'zod';

const PrimitiveValidationConfig = {
	invalid_type_error: 'Campo invalido',
	required_error: 'Campo obrigatório',
	description: 'Field validation',
};

const EmailSchema = z.string(PrimitiveValidationConfig).email({ message: 'E-mail inválido' });
const PasswordSchema = z
	.string(PrimitiveValidationConfig)
	.min(8, { message: 'Senha com mínimo de 8 caracteres' });

export const UserCredentialSchema = z.object({
	email: EmailSchema,
	password: PasswordSchema,
});
