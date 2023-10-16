import { client } from '@/utils/client';
import {
  type CreateJobListening,
  type JobListing,
  type UpdateJobListening,
} from '@/utils/types/job-listing';

async function create(payload: CreateJobListening) {
  return client
    .post<JobListing>('/job-listings', payload)
    .then((response) => response.data);
}

async function deleteOne(id: string) {
  return client.delete<JobListing>(`/job-listings/${id}`);
}

async function findAll() {
  return client
    .get<JobListing[]>('/job-listings')
    .then((response) => response.data);
}

async function findMyAll() {
  return client
    .get<JobListing[]>('/job-listings/me')
    .then((response) => response.data);
}

async function findOne(id: string) {
  return client
    .get<JobListing>(`/job-listings/${id}`)
    .then((response) => response.data);
}

async function updateOne(id: string, payload: UpdateJobListening = {}) {
  return client
    .patch<JobListing>(`/job-listings/${id}`, payload)
    .then((response) => response.data);
}

export const JobListingsService = {
  create,
  deleteOne,
  findAll,
  findMyAll,
  findOne,
  updateOne,
};
