import * as Dialog from '@radix-ui/react-dialog';
import { type DialogProps } from '@radix-ui/react-dialog';
import { type PropsWithChildren } from 'react';

export function DialogRoot(props: DialogProps) {
  const { children, ...otherProps } = props;

  return <Dialog.Root {...otherProps}>{children}</Dialog.Root>;
}

export function DialogContent({ children }: PropsWithChildren) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black bg-opacity-40 data-[state=open]:animate-overlayShow fixed inset-0' />
      <Dialog.Content className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function DialogOpenTrigger({ children }: PropsWithChildren) {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
}

export function DialogCloseTrigger({ children }: PropsWithChildren) {
  return <Dialog.Close asChild>{children}</Dialog.Close>;
}
