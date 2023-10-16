import { type PropsWithChildren } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import { FormArea, FormField, FormSelect } from '@/components/ui/form';
import {
  jobListingExperienceLevels,
  jobListingTypes,
} from '@/utils/constants/job-listing';

import { type JobListing } from '@/utils/types/job-listing';

const jobListingSchema = z.object({
  title: z.string().trim().min(2),
  company: z.string().trim().min(2),
  location: z.string().trim().min(2),
  url: z.string().url(),
  type: z.enum(jobListingTypes),
  experienceLevel: z.enum(jobListingExperienceLevels),
  salary: z.coerce.number().min(400),
  shortDescription: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
});

type JobListingSchema = z.infer<typeof jobListingSchema>;

interface JobListingFormProps extends PropsWithChildren {
  jobListing?: JobListing;
  onSubmitForm: (form: JobListingSchema) => void;
}

export function JobListingForm(props: JobListingFormProps) {
  const { children, jobListing, onSubmitForm } = props;

  const { control, formState, handleSubmit, register, watch } =
    useForm<JobListingSchema>({
      resolver: zodResolver(jobListingSchema),
      defaultValues: {
        title: jobListing?.title ?? '',
        company: jobListing?.company ?? '',
        location: jobListing?.location ?? '',
        url: jobListing?.url ?? '',
        type: jobListing?.type ?? 'INTERNSHIP',
        experienceLevel: jobListing?.experienceLevel ?? 'JUNIOR',
        salary: jobListing?.salary ?? 400,
        shortDescription: jobListing?.shortDescription ?? '',
        description: jobListing?.description ?? '',
      },
    });

  const [type, experienceLevel] = watch(['type', 'experienceLevel']);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-end'>
        <FormField
          autoFocus
          error={formState.errors.title?.message}
          label='Title'
          register={register('title')}
        />

        <FormField
          error={formState.errors.company?.message}
          label='Company'
          register={register('company')}
        />

        <FormField
          error={formState.errors.location?.message}
          label='Location'
          register={register('location')}
        />

        <FormField
          error={formState.errors.url?.message}
          label='Url'
          register={register('url')}
        />

        <Controller
          control={control}
          name='type'
          render={({ field }) => (
            <FormSelect
              error={formState.errors.type?.message}
              label='Type'
              onChange={field.onChange}
              options={jobListingTypes}
              value={type}
            />
          )}
        />

        <Controller
          control={control}
          name='experienceLevel'
          render={({ field }) => (
            <FormSelect
              error={formState.errors.experienceLevel?.message}
              label='Experience level'
              onChange={field.onChange}
              options={jobListingExperienceLevels}
              value={experienceLevel}
            />
          )}
        />

        <FormField
          className='self-start'
          error={formState.errors.salary?.message}
          label='Salary'
          type='number'
          register={register('salary')}
        />

        <FormArea
          className='lg:col-span-2'
          error={formState.errors.shortDescription?.message}
          label='Short description'
          register={register('shortDescription')}
          rows={4}
        />

        <FormArea
          className='md:col-span-2 lg:col-span-3'
          error={formState.errors.description?.message}
          label='Full description'
          register={register('description')}
          rows={8}
        />
      </div>

      {children}
    </form>
  );
}
