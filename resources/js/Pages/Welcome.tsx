import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  const handleImageError = () => {
    document
      .getElementById('screenshot-container')
      ?.classList.add('!hidden');
    document.getElementById('docs-card')?.classList.add('!row-span-1');
    document
      .getElementById('docs-card-content')
      ?.classList.add('!flex-row');
    document.getElementById('background')?.classList.add('!hidden');
  };

  return (
    <>
      <Head title="Welcome" />
      <div className="text-black/50 dark:bg-black dark:text-white/50">
        
        <div className="relative flex items-center justify-center selection:bg-[#FF2D20] selection:text-white">
          <div className="relative w-full px-[5%]">
            <header className="grid grid-cols-1 md:grid-cols-2">
              <div className='flex justify-between items-center'>
                <div className='flex justify-center items-center px-4'>
                  <h2>Logo</h2>
                </div>
                <div className='guest-access'>
                  <div className='flex justify-center items-center'>
                    <ul className='list-none flex justify-center items-center'>
                      <li className='px-[20px]'>Hire a Car</li>
                      <li className='px-[20px]'>Hire a Van</li>
                      <li className='px-[20px]'>About Us</li>
                      <li className='px-[20px]'>Blog</li>
                      <li className='px-[20px]'>Contact</li>
                    </ul>
                  </div>
                </div>
              </div>
              <nav className="-mx-3 flex flex-1 justify-end">
                {auth.user ? (
                  <Link
                    href={route('dashboard')}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href={route('login')}
                      className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
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

            <main className="mt-6">
              
            </main>

            <footer className="py-16 text-center text-sm text-black dark:text-white/70">
              Laravel v{laravelVersion} (PHP v{phpVersion})
            </footer>
          </div>
        </div>

      </div>
    </>
  );
}
