import { type PropsWithChildren } from 'react';
import * as Toast from '@radix-ui/react-toast';

export function ToastProvider({ children }: PropsWithChildren) {
  return (
    <Toast.Provider swipeDirection='right'>
      {children}
      <Toast.Viewport className='[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none' />
    </Toast.Provider>
  );
}
