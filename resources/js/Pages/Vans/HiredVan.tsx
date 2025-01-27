// resources/js/pages/cars/HiredVan.tsx

import React, { FC } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from '@/Components/Header';

interface Van {
  id: number;
  model: string;
  description: string;
  hired_on: string;
}

interface Props {
  hiredVans: Van[]; // Adjusted to reflect hiredVans instead of hiredCars
}

const HiredVan: FC<Props> = ({ hiredVans }) => {
  const auth = usePage().props.auth;

  return (
    <>
      <Head title="Hired Vans" />
      <div className="text-black/50 dark:bg-black dark:text-white/50">
        <div className="relative flex items-center justify-center selection:bg-[#FF2D20] selection:text-white">
          <div className="relative w-full flex flex-col px-0 py-8">
            <Header auth={auth} />
          </div>
        </div>
        <section className='w-full px-6 pt-4'>
          <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Your Hired Vans</h1>

            {hiredVans && hiredVans.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hiredVans.map((van) => (
                  <div key={van.id} className="border p-4 rounded-lg shadow-lg">
                    <h2 className="font-bold text-xl">{van.model}</h2>
                    <p className="text-gray-600">{van.description}</p>
                    <p className="text-green-500">Hired on: {van.hired_on}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">You have not hired any vans yet.</p>
            )}
          </div>
        </section>
        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
          
        </footer>
      </div>
    </>
  );
};

export default HiredVan;
