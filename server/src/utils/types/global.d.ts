import { type AuthUser } from '@/auth/models/auth-user.model';

declare module 'express-session' {
  interface SessionData {
    user?: AuthUser;
  }
}
