import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/ui/navbar';

export function NavbarLayout() {
  return (
    <div className='min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white'>
      <div className='border-b-2 border-gray-200'>
        <Navbar />
      </div>
      <section className='container mx-auto p-3 flex flex-col grow h-[100%]'>
        <Outlet />
      </section>
    </div>
  );
}
