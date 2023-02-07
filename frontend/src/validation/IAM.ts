import { z } from 'zod';
import { PrimitiveValidationConfig } from './ZodHelper';

const EmailSchema = z.string(PrimitiveValidationConfig).email({ message: 'e-mail inválido' });

const PasswordSchema = z
	.string(PrimitiveValidationConfig)
	.min(8, { message: 'mínimo de 8 caracteres' });

export const UserCredentialSchema = z.object({
	email: EmailSchema,
	password: PasswordSchema,
});
