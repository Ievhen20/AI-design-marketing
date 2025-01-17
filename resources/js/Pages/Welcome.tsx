import React, { useState, useEffect } from 'react';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import GuestNav from '@/Components/GuestNav';
import ApplicationLogo from '@/Components/ApplicationLogo';
import DatePicker from 'react-datepicker';
import Slider from "react-slick";
import 'react-datepicker/dist/react-datepicker.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Welcome({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  const [startDate, setStartDate] = useState<Date | null>(null); // State for start date
  const [endDate, setEndDate] = useState<Date | null>(null); // State for end date

  const carImages: string[] = [
    "/assets/img/car1.png",
    "/assets/img/car2.png",
    "/assets/img/car3.png",
    "/assets/img/car4.png",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: true,
    fade: true,
  };

  return (
    <>
      <Head title="Welcome" />
      <div className="text-black/50 dark:bg-black dark:text-white/50">
        <div className="relative flex items-center justify-center selection:bg-[#FF2D20] selection:text-white">
          <div className="relative w-full flex flex-col px-0 py-8">
            <header className="flex px-[5%] flex-col md:flex-row items-center justify-between">
              <div className="flex justify-between items-center w-full">
                <div className="flex justify-center items-center px-4">
                  <ApplicationLogo />
                </div>
                <div className="guest-access">
                  <div className="flex justify-center items-center px-4">
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

            <main className="mt-2 flex-1">
              <section
                className="w-full relative min-h-[50vh] bg-cover bg-center"
                style={{ backgroundImage: 'url("/assets/img/str-bg.png")', backgroundPosition: 'bottom' }}
              >
                <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
                <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full h-full px-4 py-8 relative z-10">
                  <div className="flex-1 pl-4 md:pl-24 max-w-md md:max-w-xl lg:max-w-4xl text-center md:display-hidden z-10">
                    <h1 className="text-3xl text-left md:text-6xl font-semibold text-white mb-4">
                      Your Perfect Ride Awaits!
                    </h1>
                    <h2 className="text-lg text-left md:text-4xl text-white mb-4">
                      At Vehicle Rent Com, we make renting a car simple and stress-free.
                    </h2>
                    <h4 className="text-lg text-left text-white mb-4">
                      Choose from our wide selection of vehicles, and hit the road with confidence.
                    </h4>
                    <h4 className="text-lg text-left text-white">No matter where you’re going, we’ve got the ride for you!</h4>
                  </div>

                  <div className="flex-1 max-w-xs md:max-w-md lg:max-w-lg mt-8 md:mt-0">
                    <div className="relative w-full pt-32 pr-12">
                      <Slider {...settings}>
                        {carImages.map((carImage, index) => (
                          <div
                            key={index}
                            className="transition-opacity duration-2000 ease-in-out opacity-0 opacity-100"
                          >
                            <img
                              src={carImage}
                              alt={`Car ${index + 1}`}
                              className="w-full h-auto transition-opacity duration-2000 ease-in-out opacity-100"
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </section>

              <div className="relative bottom-0 left-0 right-0 px-[10%] py-16 lg:absolute lg:bottom-[-100px]">
                <div className="w-full flex gap-4 justify-around flex-wrap itmes-center bg-white shadow-xl rounded-lg p-8 lg:flex-nowrap z-50">
                  <div className="pick-up mt-4">
                    <label>Pick Up Location</label>
                    <select className="w-full px-32 py-2 border border-gray-300 rounded-lg">
                      <option>Location-1</option>
                      <option>Location-2</option>
                      <option>Location-3</option>
                    </select>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <div className="w-full max-w-md px-4 py-1 bg-white border-b-2 border-b-gray-300">
                      <div className="flex items-center justify-between mb-4 space-x-4">
                        <div className="flex-1">
                          <label className="block text-sm text-gray-600">Pick-up Date & Time</label>
                          <DatePicker
                            selected={startDate}
                            onChange={(date: Date | null) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="yyyy-MM-dd HH:mm"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholderText="Select pick-up date and time"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="block text-sm text-gray-600">Drop-off Date & Time</label>
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
                            timeIntervals={15}
                            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholderText="Select drop-off date and time"
                          />
                        </div>
                      </div>
                    </div>
                    <div className='book-btn w-full mt-4'>
                      <button className='btn w-full py-1 px-auto rounded-lg bg-gray-600 text-white border-[1px] border-gray-600 hover:text-black hover:bg-white'>Book Now</button>
                    </div>
                  </div>
                  <div className="drop-off mt-4">
                    <label>Drop Off Location</label>
                    <select className="w-full px-32 py-2 border border-gray-300 rounded-lg">
                      <option>Location-1</option>
                      <option>Location-2</option>
                      <option>Location-3</option>
                    </select>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <section className='w-full'>
          <div className='m-auto px-6 pt-4 lg:pt-32'>
            <div className='w-full bg-green-500'>
              <h1>Here is com</h1>
            </div>
          </div>
        </section>
        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
          Laravel v{laravelVersion} (PHP v{phpVersion})
        </footer>
      </div>
    </>
  );
}
