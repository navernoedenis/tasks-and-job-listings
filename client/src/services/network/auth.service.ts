import { client } from '@/utils/client';
import { type User } from '@/utils/types/user';

async function checkSession() {
  return client
    .post<User>('/auth/check-session')
    .then((response) => response.data);
}

async function login(email: string, password: string) {
  return client
    .post<User>('/auth/login', { email, password })
    .then((response) => response.data);
}

async function logout() {
  return client.post('/auth/logout');
}

async function register(email: string, password: string) {
  return client
    .post<User>('/auth/register', { email, password })
    .then((response) => response.data);
}

export const AuthService = {
  checkSession,
  login,
  logout,
  register,
};
