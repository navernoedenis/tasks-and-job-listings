import { useState, useCallback } from 'react';
import { useLocation, useNavigate, type Location } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { JobListingsService } from '@/services';

import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { JobListingCard } from '@/components/ui/job-listing-card';
import { PageLayout } from '@/components/layouts';

import {
  DialogCloseTrigger,
  DialogContent,
  DialogOpenTrigger,
  DialogRoot,
} from '@/features/dialog';

import { normalizeDate } from '@/utils/helpers';
import { type JobListing } from '@/utils/types/job-listing';

type LocationState = Location<{
  jobListing: JobListing;
}>;

export function JobListingPage() {
  const location: LocationState = useLocation();
  const jobListing = location.state.jobListing;

  return (
    <DialogRoot>
      <PageLayout title='Job listing details'>
        <JobListingCard className='border-none px-0' data={jobListing} />

        <p>{jobListing.description}</p>

        <div className='flex mt-2 items-center'>
          <p className='mr-2 text-lg'>{normalizeDate(jobListing.createdAt)}</p>
          <ManageButtons jobListing={jobListing} />
        </div>

        <DeletingDialog jobListing={jobListing} />
      </PageLayout>
    </DialogRoot>
  );
}

function ManageButtons({ jobListing }: { jobListing: JobListing }) {
  const auth = useAuth();
  const navigate = useNavigate();

  const isPostedByMe = jobListing.postedById === auth.user?.id;

  return (
    <div className='ml-auto flex gap-2'>
      <BackButton />

      {isPostedByMe && (
        <>
          <Button onClick={() => navigate('edit', { state: { jobListing } })}>
            Edit
          </Button>

          <DialogOpenTrigger>
            <Button variant='contained'>Delete</Button>
          </DialogOpenTrigger>
        </>
      )}
    </div>
  );
}

function DeletingDialog({ jobListing }: { jobListing: JobListing }) {
  const navigate = useNavigate();
  const [isDeleting, setDeleting] = useState(false);

  const onDelete = useCallback(() => {
    setDeleting(true);

    JobListingsService.deleteOne(jobListing.id).then(() => {
      setDeleting(false);
      navigate('/job-listings', { replace: true });
    });
  }, [navigate, jobListing.id]);

  return (
    <DialogContent>
      <h3 className='text-lg'>Are you sure you want to delete?</h3>

      <div className='mt-3 flex gap-2 justify-end'>
        <DialogCloseTrigger>
          <Button
            className='dark:border-gray-200 w-[49%]'
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </DialogCloseTrigger>

        <Button
          className='dark:border-gray-200 w-[49%]'
          disabled={isDeleting}
          loading={isDeleting}
          onClick={onDelete}
          variant='contained'
        >
          Delete anyway
        </Button>
      </div>
    </DialogContent>
  );
}
