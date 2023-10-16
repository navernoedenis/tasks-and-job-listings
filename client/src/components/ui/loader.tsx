import { CenterLayout } from '@/components/layouts';

export function Loader() {
  return (
    <CenterLayout>
      <div className='relative flex h-32 w-32'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 dark:bg-sky-100' />
        <span className='relative inline-flex rounded-full h-32 w-32 bg-sky-500 dark:bg-sky-50' />
      </div>
    </CenterLayout>
  );
}
