import { type Profile } from '@prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class UpdateProfileDto implements Omit<Profile, 'id' | 'userId'> {
  @IsOptional()
  @IsNotEmpty()
  firstname: string;

  @IsOptional()
  @IsNotEmpty()
  lastname: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  bio: string;
}
