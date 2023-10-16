import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppProviders } from './app-providers';

import { CenterLayout, NavbarLayout } from '@/components/layouts';
import { AuthorizedGuard, LocationStateGuard } from '@/utils/guards';

import { SignInPage, SignUpPage } from '@/components/pages/auth';
import { ProfilePage } from '@/components/pages/profile';
import { NewTaskPage, TastsPage } from '@/components/pages/tasts';
import {
  EditJobListingPage,
  JobListingPage,
  JobListingsPage,
  NewJobListingsPage,
  UserJobListingsPage,
} from '@/components/pages/job-listings';
import { NotFoundPage } from '@/components/pages/not-found';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppProviders />,
    children: [
      {
        element: <NavbarLayout />,
        children: [
          { index: true, element: <Navigate to='/job-listings' /> },
          {
            path: 'job-listings',
            children: [
              { index: true, element: <JobListingsPage /> },
              {
                path: 'new',
                element: (
                  <AuthorizedGuard>
                    <NewJobListingsPage />
                  </AuthorizedGuard>
                ),
              },
              {
                path: 'me',
                element: (
                  <AuthorizedGuard>
                    <UserJobListingsPage />
                  </AuthorizedGuard>
                ),
              },
              {
                path: ':id',
                element: (
                  <LocationStateGuard>
                    <JobListingPage />
                  </LocationStateGuard>
                ),
              },
              {
                path: ':id/edit',
                element: (
                  <AuthorizedGuard>
                    <LocationStateGuard>
                      <EditJobListingPage />
                    </LocationStateGuard>
                  </AuthorizedGuard>
                ),
              },
            ],
          },
          {
            path: 'tasks',
            element: <AuthorizedGuard asOutlet />,
            children: [
              { index: true, element: <TastsPage /> },
              {
                path: 'new',
                element: <NewTaskPage />,
              },
            ],
          },
          {
            path: 'profile/:id',
            element: <ProfilePage />,
          },
          {
            path: 'auth',
            element: <CenterLayout asOutlet />,
            children: [
              { path: 'sign-in', element: <SignInPage /> },
              { path: 'sign-up', element: <SignUpPage /> },
            ],
          },
          {
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);
