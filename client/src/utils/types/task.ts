import {
  taskCategories,
  taskPriorities,
  taskStatuses,
} from '../constants/task';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

export type TaskCategory = (typeof taskCategories)[number];
export type TaskPriority = (typeof taskPriorities)[number];
export type TaskStatus = (typeof taskStatuses)[number];

export type CreateTask = Pick<Task, 'title'> &
  Partial<Pick<Task, 'category' | 'priority' | 'status'>>;

export type UpdateTask = Partial<CreateTask>;
