import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { type User } from '@prisma/client';

const template = 'Password must contains at least';

type RequiredFields = Pick<User, 'email' | 'password'>;

export class CreateUserDto implements RequiredFields {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 24)
  @Matches(/[0-9]/, { message: `${template} one number` })
  @Matches(/[A-Z]/, { message: `${template} one uppercase letter` })
  @Matches(/[a-z]/, { message: `${template} one lowercase letter` })
  password: string;
}
