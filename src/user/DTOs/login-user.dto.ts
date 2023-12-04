import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const LoginUser = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export class LoginUserDTO extends createZodDto(LoginUser) {}
