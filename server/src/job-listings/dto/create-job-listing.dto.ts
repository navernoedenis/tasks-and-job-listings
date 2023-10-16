import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
} from 'class-validator';

import {
  type JobListingExperienceLevel,
  type JobListingType,
  type JobListing,
} from '@prisma/client';

const experienceLevels: JobListingExperienceLevel[] = [
  'JUNIOR',
  'MIDDLE',
  'SENIOR',
];

const listinngTypes: JobListingType[] = [
  'FULL_TIME',
  'INTERNSHIP',
  'PART_TIME',
];

type RequiredFields = Omit<
  JobListing,
  'id' | 'postedById' | 'createdAt' | 'updatedAt' | 'expiresAt'
>;

export class CreateJobListingDto implements RequiredFields {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  company: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsIn(listinngTypes)
  type: JobListingType;

  @IsOptional()
  @IsIn(experienceLevels)
  experienceLevel: JobListingExperienceLevel;

  @IsOptional()
  @IsInt()
  salary: number;

  @IsNotEmpty()
  @MaxLength(200)
  shortDescription: string;

  @IsNotEmpty()
  @MaxLength(2000)
  description: string;
}
