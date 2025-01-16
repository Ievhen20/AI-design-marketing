import { PageProps } from '@/types'; 
import { Head, Link } from '@inertiajs/react';
import GuestNav from '@/Components/GuestNav';
import ApplicationLogo from '@/Components/ApplicationLogo';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';  // Import datepicker styles

export default function Welcome({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {

  const [startDate, setStartDate] = useState<Date | null>(null); // State for start date
  const [endDate, setEndDate] = useState<Date | null>(null); // State for end date

  return (
    <>
      <Head title="Welcome" />
      <div className="text-black/50 dark:bg-black dark:text-white/50">
        <div className="relative flex items-center justify-center selection:bg-[#FF2D20] selection:text-white">
          <div className="relative w-full flex flex-col px-0 py-8">
            <header className="flex px-[5%] flex-col md:flex-row">
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center px-4">
                  <ApplicationLogo />
                </div>
                <div className="guest-access">
                  <div className="flex justify-center items-center">
                    <GuestNav />
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

            <main className="mt-6 flex-1">
              <section className="w-full min-h-[50vh] m-auto bg-cover bg-center relative" style={{ backgroundImage: 'url("/assets/img/bg.png")', backgroundPosition: 'top' }}>
                <div className="absolute inset-0 bg-black opacity-50 z-0"></div> {/* Overlay with opacity */}
                <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full h-full px-4 py-8 relative z-10">
                  <div className="flex-1 pl-24 max-w-md md:max-w-xl lg:max-w-4xl text-center md:text-left">
                    <h1 className="text-3xl md:text-6xl font-semibold text-white mb-4">Your Perfect Ride Awaits!</h1>
                    <h2 className="text-2xl md:text-4xl text-white mb-4">At Vehicle Rent Com, we make renting a car simple and stress-free.</h2>
                    <h4 className="text-lg text-white mb-4">Choose from our wide selection of vehicles, and hit the road with confidence.</h4>
                    <h4 className="text-lg text-white">No matter where you’re going, we’ve got the ride for you!</h4>
                  </div>

                  <div className="flex-1 max-w-xs md:max-w-md lg:max-w-lg mt-8 md:mt-0">
                    <img src="/assets/img/car6.png" alt="car" className="w-full h-auto object-contain" />
                  </div>
                </div>
              </section>

              <div className="w-full flex justify-center items-center py-8">
                <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                  <h3 className="text-xl text-center mb-4 text-black dark:text-white">Select Booking Dates</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 dark:text-gray-200">Pick-up Date & Time</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="yyyy-MM-dd HH:mm"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}  // Sets the time intervals to 15 minutes
                        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
                        placeholderText="Select pick-up date and time"
                      />
                    </div>

                    <span className="mx-4 text-gray-500 dark:text-gray-300">to</span>

                    <div className="flex-1">
                      <label className="block text-sm text-gray-600 dark:text-gray-200">Drop-off Date & Time</label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat="yyyy-MM-dd HH:mm"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}  // Sets the time intervals to 15 minutes
                        className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
                        placeholderText="Select drop-off date and time"
                      />
                    </div>
                  </div>
                </div>
              </div>
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
