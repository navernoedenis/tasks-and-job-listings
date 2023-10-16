import cn from 'clsx';
import { type ReactNode } from 'react';

export interface FormBaseProps {
  rootClassname?: string;
  error?: string;
  label?: string;
  labelClassname?: string;
}

export function FormBase(props: FormBaseProps & { children: ReactNode }) {
  const {
    children,
    error,
    label = '',
    labelClassname = '',
    rootClassname = '',
  } = props;

  return (
    <div
      className={cn('flex flex-col gap-1', {
        [rootClassname]: !!rootClassname,
      })}
    >
      <div className='mb-1 flex items-start justify-between'>
        {label && (
          <label
            className={cn('text-[15px] font-medium leading-[24px] shrink-0', {
              [labelClassname]: !!labelClassname,
            })}
          >
            {label}
          </label>
        )}
        {error && (
          <p className='ml-2 text-right text-[13px] text-red-600 opacity-[0.8]'>
            {error}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
