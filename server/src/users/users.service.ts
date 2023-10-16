import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { type User, type UserRole } from '@prisma/client';
import { prisma } from '@/prisma';

import { type AuthUser } from '@/auth/models/auth-user.model';
import { profileSelect } from '@/profiles/helpers/profile.select';

import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      throw new UnauthorizedException(`${email} is already taken!`);
    }

    const user = await prisma.user.create({
      data: { email, password },
    });

    await prisma.profile.create({
      data: { userId: user.id },
    });

    return user;
  }

  async findAll() {
    return prisma.user.findMany({
      include: {
        profile: {
          select: profileSelect(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(
    keyName: keyof Pick<User, 'id' | 'email'>,
    keyValue: string,
    throwNotFoundException: boolean = false,
  ) {
    const user = await prisma.user.findFirst({
      include: {
        profile: {
          select: profileSelect(),
        },
      },
      where: {
        [keyName]: keyValue,
      },
    });

    if (!user && throwNotFoundException) {
      throw new NotFoundException(`User not found`);
    }

    return user ?? null;
  }

  async remove(id: string, authUser: AuthUser) {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const permittedRoles: UserRole[] = ['ADMIN', 'ROOT'];

    if (permittedRoles.includes(authUser.role) || id === authUser.id) {
      return prisma.user.delete({
        where: {
          id: user.id,
        },
      });
    }

    throw new ForbiddenException("You don't have permission to remove user");
  }

  async updateRole(
    userId: string,
    authUser: AuthUser,
    updateRoleDto: UpdateRoleDto,
  ) {
    const { role } = updateRoleDto;
    await this.findOne('id', userId, true);

    const permittedRoles: UserRole[] = ['ADMIN', 'ROOT'];

    if (permittedRoles.includes(authUser.role)) {
      return prisma.user.update({
        where: { id: userId },
        data: { role },
      });
    }

    throw new ForbiddenException();
  }
}
