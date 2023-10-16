import { client } from '@/utils/client';
import {
  type CreateTask,
  type Task,
  type UpdateTask,
} from '@/utils/types/task';

async function create(payload: CreateTask) {
  return client.post<Task>('/tasks', payload).then((response) => response.data);
}

async function deleteOne(id: string) {
  return client.delete<Task>(`/tasks/${id}`).then((response) => response.data);
}

async function findOne(id: string) {
  return client.get<Task>(`/tasks/${id}`).then((response) => response.data);
}

async function findAll() {
  return client.get<Task[]>('/tasks').then((response) => response.data);
}

async function findMyAll() {
  return client.get<Task[]>('/tasks/me').then((response) => response.data);
}

async function update(id: string, payload: UpdateTask) {
  return client
    .patch<Task>(`/tasks/${id}`, payload)
    .then((response) => response.data);
}

export const TasksService = {
  create,
  deleteOne,
  findAll,
  findMyAll,
  findOne,
  update,
};
