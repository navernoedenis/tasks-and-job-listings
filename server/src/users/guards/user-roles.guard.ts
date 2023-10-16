import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type Request } from 'express';
import { UserRoles } from '../decorators/user-roles.decorator';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(UserRoles, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as Request;
    const user = request.session.user;
    if (!user) {
      return false;
    }

    return roles.includes(user.role);
  }
}
