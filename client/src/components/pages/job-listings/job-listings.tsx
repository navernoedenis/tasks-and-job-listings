import { useNavigate, Link } from 'react-router-dom';
import cn from 'clsx';

import { useAuth } from '@/features/auth';

import { useFetch } from '@/hooks';
import { JobListingsService } from '@/services';

import { Button } from '@/components/ui/button';
import { JobListingCard } from '@/components/ui/job-listing-card';
import { PageLayout } from '@/components/layouts';

export function JobListingsPage() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { data } = useFetch({
    fetcher: JobListingsService.findAll,
    initialValue: [],
  });

  return (
    <PageLayout
      title='Job Listings'
      headerButton={
        <Button onClick={() => navigate('new')}>Create Listing</Button>
      }
    >
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
        {data.map((jobListing) => (
          <Link to={jobListing.id} state={{ jobListing }} key={jobListing.id}>
            <JobListingCard
              data={jobListing}
              className={cn('h-full transition-shadow hover:shadow-lg', {
                ['border-orange-500']: jobListing.postedById === user?.id,
              })}
            />
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
