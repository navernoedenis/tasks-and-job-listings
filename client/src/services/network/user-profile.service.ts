import { client } from '@/utils/client';
import { type UserProfile, type UpdateUserProfile } from '@/utils/types/user';

async function updateMe(payload: UpdateUserProfile = {}) {
  return client
    .patch<UserProfile>('/users/me', payload)
    .then((response) => response.data);
}

export const UserProfileService = {
  updateMe,
};
