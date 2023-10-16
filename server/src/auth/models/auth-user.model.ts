import { type User } from '@prisma/client';

export type AuthUser = Pick<User, 'id' | 'email' | 'role'>;
