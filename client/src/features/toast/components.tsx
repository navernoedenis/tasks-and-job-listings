import { type PropsWithChildren } from 'react';
import * as Toast from '@radix-ui/react-toast';

interface ToastRootProps extends PropsWithChildren {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export function ToastRoot(props: ToastRootProps) {
  const { open, onOpenChange, children } = props;

  return (
    <Toast.Root
      className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
      onOpenChange={onOpenChange}
      open={open}
    >
      {children}
    </Toast.Root>
  );
}

export function ToastCloseTrigger({ children }: PropsWithChildren) {
  return (
    <Toast.Action altText='close toast' asChild>
      {children}
    </Toast.Action>
  );
}
