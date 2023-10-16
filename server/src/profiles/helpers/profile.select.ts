import { type Profile } from '@prisma/client';

type ProfileRecord = Record<keyof Profile, boolean>;

const defaultValues: ProfileRecord = {
  id: false,
  userId: false,
  avatar: true,
  bio: true,
  firstname: true,
  lastname: true,
};

export function profileSelect(
  options: Partial<ProfileRecord> = {},
): ProfileRecord {
  return { ...defaultValues, ...options };
}
