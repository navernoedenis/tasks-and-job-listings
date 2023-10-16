import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

type ChildrenProps = { children: ReactNode };
type OutletProps = { asOutlet: ReactNode };
type RootProps = Partial<OutletProps & ChildrenProps>;

export function CenterLayout({ children }: ChildrenProps): JSX.Element;
export function CenterLayout({ asOutlet }: OutletProps): JSX.Element;
export function CenterLayout({ asOutlet, children }: RootProps) {
  return (
    <div className='m-auto h-[100%] w-[100%] flex items-center justify-center'>
      {children && children}
      {asOutlet && <Outlet />}
    </div>
  );
}
