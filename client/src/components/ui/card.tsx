import { type PropsWithChildren } from 'react';
import cn from 'clsx';

interface CardProps extends PropsWithChildren {
  addInnerPadding?: boolean;
  className?: string;
}

export function Card(props: CardProps) {
  const { addInnerPadding = false, className = '', children } = props;

  return (
    <div
      className={cn(
        'max-w-sm rounded overflow-hidden shadow-lg dark:shadow-stone-700',
        {
          ['px-6 py-4']: addInnerPadding,
          [className]: !!className,
        }
      )}
    >
      {children}
    </div>
  );
}
