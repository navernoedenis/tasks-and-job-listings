import axios from 'axios';
import { env } from '@/config/env';
import { errorMessage } from '@/utils/helpers';

export const client = axios.create({
  baseURL: env.VITE_DATABASE_URL,
  withCredentials: true,
});

client.interceptors.response.use(undefined, (error) => {
  return Promise.reject(errorMessage(error));
});
