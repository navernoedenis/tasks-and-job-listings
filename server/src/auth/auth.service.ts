import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '@/users/users.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';

import { AuthUserDto } from '@/auth/dto/auth-user.dto';
import { excludeFields } from '@/utils/helpers/exclude-fields';
import { type AuthUser } from './models/auth-user.model';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(authUserDto: AuthUserDto) {
    const { email, password } = authUserDto;
    const user = await this.usersService.findOne('email', email, true);
    const isPasswordMatch = await this.comparePassword(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Password are not match');
    }

    return excludeFields(user, ['password', 'updatedAt']);
  }

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const hash = await this.hashPassword(password);
    const user = await this.usersService.create({
      email,
      password: hash,
    });
    return excludeFields(user, ['password', 'updatedAt']);
  }

  async checkSession(authUser: AuthUser) {
    const user = await this.usersService.findOne('id', authUser.id);
    if (!user) {
      throw new ForbiddenException();
    }
    return excludeFields(user, ['password', 'updatedAt']);
  }

  private async hashPassword(password: string): Promise<string | null> {
    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private async comparePassword(password: string, hash: string) {
    try {
      const isMatched = await bcrypt.compare(password, hash);
      return isMatched;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
