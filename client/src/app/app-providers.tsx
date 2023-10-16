import { Outlet, ScrollRestoration } from 'react-router-dom';

import { AuthProvider } from '@/features/auth';
import { ThemeProvider } from '@/features/theme';
import { ToastProvider } from '@/features/toast';

export function AppProviders() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Outlet />
          <ScrollRestoration />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
