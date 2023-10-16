import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import {
  type TaskCategory,
  type TaskPriority,
  type TaskStatus,
  type Task,
} from '@prisma/client';

const categories: TaskCategory[] = ['PERSONAL', 'WORK'];
const priorities: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH'];
const statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];

type RequiredFields = Omit<Task, 'id' | 'authorId' | 'createdAt' | 'updatedAt'>;

export class CreateTaskDto implements RequiredFields {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsIn(categories)
  category: TaskCategory;

  @IsOptional()
  @IsIn(priorities)
  priority: TaskPriority;

  @IsOptional()
  @IsIn(statuses)
  status: TaskStatus;
}
