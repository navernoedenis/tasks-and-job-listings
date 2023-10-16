import { Reflector } from '@nestjs/core';
import { type UserRole } from '@prisma/client';

export const UserRoles = Reflector.createDecorator<UserRole[]>();
