import {
  jobListingExperienceLevels,
  jobListingTypes,
} from '../constants/job-listing';

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  type: JobListingType;
  experienceLevel: JobListingExperienceLevel;
  salary: number;
  shortDescription: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date | null;
  postedById: string;
}

export type JobListingType = (typeof jobListingTypes)[number];
export type JobListingExperienceLevel =
  (typeof jobListingExperienceLevels)[number];

export type CreateJobListening = Pick<
  JobListing,
  'company' | 'description' | 'location' | 'shortDescription' | 'title' | 'url'
> &
  Partial<Pick<JobListing, 'type' | 'experienceLevel' | 'salary'>>;

export type UpdateJobListening = Partial<
  Omit<
    JobListing,
    'createdAt' | 'expiresAt' | 'id' | 'postedById' | 'updatedAt'
  >
>;
