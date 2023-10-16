import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';

export const AuthSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    return request.session.user;
  },
);
