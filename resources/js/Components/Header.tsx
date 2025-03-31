import React from 'react';
import { Link } from '@inertiajs/react';
import GuestNav from '@/Components/GuestNav';
import Navbar from '@/Components/Navbar';
import ApplicationLogo from '@/Components/ApplicationLogo';

interface HeaderProps {
  auth: any;
}

const Header: React.FC<HeaderProps> = ({ auth }) => {
  return (
    <header className="flex px-[5%] flex-col md:flex-row items-center justify-between">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-center items-center px-4">
          <ApplicationLogo />
        </div>
        <div className="guest-access">
          <div className="flex justify-center items-center px-4">
            {
              auth.user ? <Navbar /> : <GuestNav />
            }
            {/* <GuestNav /> */}
          </div>
        </div>
      </div>
      <nav className="-mx-3 flex flex-1 justify-end">
        {auth.user ? (
          <></>
        ) : (
          <>
            <Link
              href={route('login')}
              className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition text-nowrap hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
            >
              Log in
            </Link>
            <Link
              href={route('register')}
              className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
