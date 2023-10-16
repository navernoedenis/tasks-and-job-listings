import { type PropsWithChildren } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/features/auth';
import { Loader } from '@/components/ui/loader';

interface AuthorizedGuardProps extends PropsWithChildren {
  asOutlet?: boolean;
}

export function AuthorizedGuard(props: AuthorizedGuardProps) {
  const { asOutlet = false, children } = props;

  const location = useLocation();
  const { isAuthorizated, isUserLoading } = useAuth();

  if (isUserLoading) {
    return <Loader />;
  }

  if (!isUserLoading && !isAuthorizated) {
    return <Navigate to='/auth/sign-in' state={{ from: location }} />;
  }

  return asOutlet ? <Outlet /> : children;
}
