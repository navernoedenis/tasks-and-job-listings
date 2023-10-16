import { userRoles } from '../constants/user';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt?: Date;
  profile?: UserProfile;
}

export type UserRole = (typeof userRoles)[number];

export interface UserProfile {
  avatar: string;
  bio: string;
  firstname: string;
  lastname: string;
}

export type UpdateUserProfile = Partial<UserProfile>;
