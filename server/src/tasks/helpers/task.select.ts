import { type Task } from '@prisma/client';

type ProfileRecord = Record<keyof Task, boolean>;

const defaultValues: ProfileRecord = {
  id: true,
  authorId: true,
  category: true,
  createdAt: true,
  priority: true,
  status: true,
  title: true,
  updatedAt: true,
};

export function taskSelect(
  options: Partial<ProfileRecord> = {},
): ProfileRecord {
  return { ...defaultValues, ...options };
}
