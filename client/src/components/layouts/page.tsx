import { type PropsWithChildren, type ReactNode } from 'react';

interface PageLayoutProps extends PropsWithChildren {
  headerButton?: ReactNode;
  title: string;
}

export function PageLayout(props: PageLayoutProps) {
  const { children, headerButton, title } = props;

  return (
    <>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-4xl font-semibold'>{title}</h1>
        {headerButton && <div className='ml-auto'>{headerButton}</div>}
      </div>
      <main>{children}</main>
    </>
  );
}
