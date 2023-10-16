import { IsEmail, IsNotEmpty } from 'class-validator';
import { type User } from '@prisma/client';

type RequiredFields = Pick<User, 'email' | 'password'>;

export class AuthUserDto implements RequiredFields {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
