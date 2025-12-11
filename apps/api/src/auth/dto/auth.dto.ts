import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// 1. Register Schema
const RegisterSchema = z.object({
  email: z.email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
});

// 2. Login Schema (THIS WAS MISSING)
const LoginSchema = z.object({
  email: z.email('Invalid email format'),
  password: z.string(),
});

// 3. Export Classes
export class RegisterDto extends createZodDto(RegisterSchema) {}
export class LoginDto extends createZodDto(LoginSchema) {}
