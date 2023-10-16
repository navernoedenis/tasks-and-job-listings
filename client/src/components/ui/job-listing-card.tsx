import { memo, type PropsWithChildren } from 'react';
import cn from 'clsx';

import { Tag } from '@/components/ui/tag';
import { type JobListing } from '@/utils/types/job-listing';
import { normalizeSlug } from '@/utils/helpers';

interface JobListingCardProps extends PropsWithChildren {
  className?: string;
  data: JobListing;
}

export const JobListingCard = memo((props: JobListingCardProps) => {
  const { children, className = '', data: item } = props;

  return (
    <div
      className={cn('border rounded p-4 flex flex-col', {
        [className]: !!className,
      })}
    >
      <header className='mb-1 flex items-start justify-between'>
        <h4 className='font-semibold'>{item.title}</h4>
        <Tag className='ml-2' children={normalizeSlug(item.type)} />
      </header>

      <h5 className='text-gray-400 text-sm'>{item.company}</h5>
      <h6 className='mb-1 text-gray-400 text-sm'>{item.location}</h6>

      <div className='mb-3 flex gap-1'>
        <Tag>${item.salary}</Tag>
        <Tag>{normalizeSlug(item.type)}</Tag>
        <Tag>{normalizeSlug(item.experienceLevel)}</Tag>
      </div>

      <p>{item.shortDescription}</p>

      {children && (
        <footer className='mt-auto pt-2 self-end flex gap-2'>{children}</footer>
      )}
    </div>
  );
});
