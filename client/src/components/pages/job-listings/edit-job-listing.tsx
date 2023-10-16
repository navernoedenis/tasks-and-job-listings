import { useCallback } from 'react';
import { useLocation, useNavigate, type Location } from 'react-router-dom';

import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { JobListingForm } from '@/components/forms/job-listing';
import { PageLayout } from '@/components/layouts';

import { JobListingsService } from '@/services';
import {
  type JobListing,
  type UpdateJobListening,
} from '@/utils/types/job-listing';

type LocationState = Location<{
  jobListing: JobListing;
}>;

export function EditJobListingPage() {
  const location: LocationState = useLocation();
  const navigate = useNavigate();

  const jobListing = location.state.jobListing;

  const onUpdateJobListing = useCallback(
    (formData: UpdateJobListening) => {
      JobListingsService.updateOne(jobListing.id, formData)
        .then(() => navigate('/job-listings'))
        .catch(console.error);
    },
    [navigate, jobListing.id]
  );

  return (
    <PageLayout title='Edit Job Listing'>
      <JobListingForm jobListing={jobListing} onSubmitForm={onUpdateJobListing}>
        <div className='mt-3 flex gap-2 justify-end'>
          <BackButton type='button' />
          <Button variant='contained' type='submit'>
            Submit
          </Button>
        </div>
      </JobListingForm>
    </PageLayout>
  );
}
