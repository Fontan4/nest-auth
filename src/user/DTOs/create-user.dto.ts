import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const RegisterUserDTO = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(20),
  password: z.string().min(8).max(20),
});

export class CreateUserDto extends createZodDto(RegisterUserDTO) {}
