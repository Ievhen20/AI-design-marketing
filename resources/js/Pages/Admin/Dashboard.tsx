// resources/js/pages/cars/HiredVan.tsx

import React, { FC } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from '@/Components/Header';

const Dashboard: FC = () => {
  const auth = usePage().props.auth;

  return (
    <>
      <Head title="Admin Dashboard" />
      <div className="text-black/50 dark:bg-black dark:text-white/50">
        <div className="relative flex items-center justify-center selection:bg-[#FF2D20] selection:text-white">
          <div className="relative w-full flex flex-col px-0 py-8">
            <Header auth={auth} />
          </div>
        </div>
        <main>
          <h1>Admin Dashboard</h1>
        </main>
        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
          {/* Footer content here */}
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
