import { Link } from 'react-router-dom';

import { useAuth } from '@/features/auth';

import { ThemeButton } from './theme-button';
import { UserMenu } from './user-menu';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className='container mx-auto p-3 flex justify-between items-center'>
      <Link className='text-xl' to='/'>
        {'.(>.<).'}
      </Link>

      <div className='flex justify-end items-center gap-4'>
        <ThemeButton />

        <Link to='/job-listings'>Job Listings</Link>
        <Link to='/tasks'>Tasks</Link>

        {user && <UserMenu onLogout={logout} user={user} />}
        {!user && <Link to='/auth/sign-in'>Sign in</Link>}
      </div>
    </div>
  );
}
