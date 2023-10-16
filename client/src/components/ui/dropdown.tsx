import { forwardRef } from 'react';
import cn from 'clsx';
import { BiChevronRight } from 'react-icons/bi';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import {
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuSubContentProps,
  type DropdownMenuSubTriggerProps,
} from '@radix-ui/react-dropdown-menu';

export const Dropdown = DropdownMenuPrimitive.Root;
export const DropdownTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownPortal = DropdownMenuPrimitive.Portal;

export const DropdownContent = forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ children, className = '', ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={cn(
          'bg-white dark:bg-slate-800 rounded-md p-3 text-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]',
          {
            [className]: !!className,
          }
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
});

export const DropdownItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ children, className = '', ...props }, forwardedRef) => {
    return (
      <DropdownMenuPrimitive.Item
        className={cn(
          'outline-0 cursor-pointer text-md text-black dark:text-white py-1 first:pt-0 last:pb-0',
          {
            [className]: !!className,
          }
        )}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Item>
    );
  }
);

export const DropdownSubmenu = DropdownMenuPrimitive.Sub;

export const DropdownSubmenuTrigger = forwardRef<
  HTMLDivElement,
  DropdownMenuSubTriggerProps
>(({ children, className = '', ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(
        'outline-0 flex items-center justify-between py-1 cursor-default text-black dark:text-white',
        {
          [className]: !!className,
        }
      )}
      ref={forwardedRef}
      {...props}
    >
      {children}
      <span className='ml-1 text-lg'>
        <BiChevronRight />
      </span>
    </DropdownMenuPrimitive.SubTrigger>
  );
});

export const DropdownSubmenuContent = forwardRef<
  HTMLDivElement,
  DropdownMenuSubContentProps
>(({ children, className = '', ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.SubContent
      className={cn(
        'bg-white dark:bg-slate-800 rounded-md p-3 text-md text-black dark:text-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]]',
        {
          [className]: !!className,
        }
      )}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.SubContent>
  );
});
