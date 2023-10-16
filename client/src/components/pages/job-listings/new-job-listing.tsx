import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { JobListingForm } from '@/components/forms/job-listing';
import { PageLayout } from '@/components/layouts';

import { JobListingsService } from '@/services';
import { type CreateJobListening } from '@/utils/types/job-listing';

export function NewJobListingsPage() {
  const navigate = useNavigate();

  const onCreateJobListing = useCallback(
    (formData: CreateJobListening) => {
      JobListingsService.create(formData)
        .then(() => navigate('/job-listings'))
        .catch(console.error);
    },
    [navigate]
  );

  return (
    <PageLayout title='New Listing'>
      <JobListingForm onSubmitForm={onCreateJobListing}>
        <div className='mt-3 flex gap-2 justify-end'>
          <BackButton hideArrowIcon type='button'>
            Cancel
          </BackButton>
          <Button variant='contained' type='submit'>
            Create
          </Button>
        </div>
      </JobListingForm>
    </PageLayout>
  );
}
