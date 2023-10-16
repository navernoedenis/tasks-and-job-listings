import { client } from '@/utils/client';
import { type User } from '@/utils/types/user';

async function deleteOne(id: string) {
  return client.delete<User>(`/users/${id}`).then((response) => response.data);
}

async function findAll() {
  return client.get<User[]>('/users').then((response) => response.data);
}

async function findOne(id: string) {
  return client
    .get<User | null>(`/users/${id}`)
    .then((response) => response.data);
}

async function updateRole(id: string, options: Partial<User>) {
  return client
    .patch<User>(`/users/${id}`, options)
    .then((response) => response.data);
}

export const UsersService = {
  deleteOne,
  findAll,
  findOne,
  updateRole,
};
