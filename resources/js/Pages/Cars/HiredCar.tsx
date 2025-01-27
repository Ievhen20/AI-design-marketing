// resources/js/pages/cars/HiredCar.tsx

import React, { useState, useEffect } from 'react';
import { FC } from 'react';
import { Car } from '../../types';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Header from '@/Components/Header';
import ApplicationLogo from '@/Components/ApplicationLogo';
import DatePicker from 'react-datepicker';
import Slider from "react-slick";
import { addDays } from 'date-fns';
import { reviews } from '@/utility/reviews';
import { references } from '@/utility/references';

import 'react-datepicker/dist/react-datepicker.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  hiredCars: Car[];
}

const HiredCar: FC<Props> = ({ hiredCars }) => {
  const auth = usePage().props.auth;

  return (
    <>
      <Head title="HireCar" />
      <div className="text-black/50 dark:bg-black dark:text-white/50">
        <div className="relative flex items-center justify-center selection:bg-[#FF2D20] selection:text-white">
          <div className="relative w-full flex flex-col px-0 py-8">
            <Header auth={auth} />
          </div>
        </div>
        <section className='w-full px-6 pt-4'>
          <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Your Hired Cars</h1>

            {hiredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hiredCars.map((car) => (
                  <div key={car.id} className="border p-4 rounded-lg shadow-lg">
                    <h2 className="font-bold text-xl">{car.model}</h2>
                    <p className="text-gray-600">{car.description}</p>
                    <p className="text-green-500">Hired on: {car.hired_on}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">You have not hired any cars yet.</p>
            )}
          </div>
        </section>
        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
          
        </footer>
      </div>
    </>
    
  );
};

export default HiredCar;
