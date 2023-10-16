import { IsIn } from 'class-validator';
import { type UserRole } from '@prisma/client';

type PermitedUserRole = Exclude<UserRole, 'ROOT'>;

const roles: PermitedUserRole[] = ['ADMIN', 'DEVELOPER', 'USER'];

export class UpdateRoleDto {
  @IsIn(roles)
  role: PermitedUserRole;
}
