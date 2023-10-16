import { type PropsWithChildren } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

interface LocationStateGuardProps extends PropsWithChildren {
  asOutlet?: boolean;
  fallbackUrl?: string;
}

export function LocationStateGuard(props: LocationStateGuardProps) {
  const { asOutlet = false, fallbackUrl = '/', children } = props;

  const location = useLocation();

  if (!location.state) {
    return <Navigate to={fallbackUrl} state={{ from: location }} />;
  }

  return asOutlet ? <Outlet /> : children;
}
