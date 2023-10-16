import { type PropsWithChildren } from 'react';
import cn from 'clsx';

interface TagProps extends PropsWithChildren {
  className?: string;
}

export function Tag(props: TagProps) {
  const { className = '', children } = props;

  return (
    <span
      className={cn(
        'inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 shrink-0',
        {
          [className]: !!className,
        }
      )}
    >
      {children}
    </span>
  );
}
