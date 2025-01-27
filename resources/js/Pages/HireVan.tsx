import React, { useState, useEffect } from 'react';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
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

export default function HireVan({
  auth,
  laravelVersion,
  phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  const [startDate, setStartDate] = useState<Date | null>(null); // Pickup Date
  const [endDate, setEndDate] = useState<Date | null>(null); // Dropoff Date
  const [startTime, setStartTime] = useState<string>('00:00'); // Pickup time
  const [endTime, setEndTime] = useState<string>('00:00'); // Dropoff time

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

  const disableBeforePickupDate = (date: Date) => {
    if (startDate) {
      return date < startDate;
    }
    return false;
  };

  const getStarRating = (score: number) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={`text-lg ${i < score ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <Head title="HireVan" />
      <div className="text-black/50 dark:bg-black dark:text-white/50">
        <div className="relative flex items-center justify-center selection:bg-[#FF2D20] selection:text-white">
          <div className="relative w-full flex flex-col px-0 py-8">
            <Header auth={auth} />

            <main className="mt-2 flex-1">
              <section
                className="w-full relative min-h-[55vh] bg-cover bg-center"
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
                    <div className="relative w-full pt-12 pr-12">
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

              <div className="relative bottom-0 left-0 right-0 px-[15%] py-16 lg:absolute lg:top-[48vh]">
                <div className="w-full flex gap-2 justify-around flex-wrap itmes-center bg-white shadow-xl rounded-lg p-8 lg:flex-nowrap z-50">
                  <div className='flex flex-col justify-center items-center'>
                    <div className="w-full px-4 py-1 bg-white border-b-2 border-b-gray-300">
                      <div className="flex items-center justify-between mb-4 space-x-4">
                        {/* Pickup Date */}
                        <div className="pickup-date w-full sm:w-1/2 md:w-1/3">
                          <div className="relative max-w-sm">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 z-50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                              </svg>
                            </div>
                            <DatePicker
                              selected={startDate}
                              onChange={(date: Date) => setStartDate(date)}
                              dateFormat="MMMM d, yyyy"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholderText="Select pickup date"
                              minDate={new Date()}
                            />
                          </div>
                        </div>

                        {/* Pickup Time */}
                        <div className="pickup-time w-full sm:w-1/2 md:w-1/3">
                          <form className="max-w-[8rem] mx-auto">
                            <input
                              type="time"
                              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              min="09:00"
                              max="18:00"
                              value={startTime}
                              onChange={(e) => setStartTime(e.target.value)}
                            />
                          </form>
                        </div>

                        {/* Dropoff Date */}
                        <div className="drop-off-date w-full sm:w-1/2 md:w-1/3">
                          <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 z-50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                              </svg>
                            </div>
                            <DatePicker
                              selected={endDate}
                              onChange={(date: Date) => setEndDate(date)}
                              dateFormat="MMMM d, yyyy"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholderText="Select dropoff date"
                              minDate={startDate ? addDays(startDate, 1) : new Date()}
                              excludeDates={[startDate]}
                            />
                          </div>
                        </div>

                        {/* Dropoff Time */}
                        <div className="drop-off-time w-full sm:w-1/2 md:w-1/3">
                          <form className="max-w-[8rem] mx-auto">
                            <input
                              type="time"
                              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              min="09:00"
                              max="18:00"
                              value={endTime}
                              onChange={(e) => setEndTime(e.target.value)}
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-8 justify-between items-center text-left py-2'>
                      <div className='flex gap-2 items-center'>
                        <input type='checkbox' className='mx-2' />
                        <p>Drop car off at different location</p>
                      </div>
                      <div className='flex gap-2 items-center'>
                        <input type='checkbox' />
                        <p>Driver aged between 30 ~ 65?</p>
                      </div>
                    </div>
                    <div className='book-btn w-full mt-2'>
                      <button className='btn w-full py-1 px-auto rounded-lg bg-gray-600 text-white border-[1px] border-gray-600 hover:text-black hover:bg-white'>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <section className='w-full px-6 pt-4 lg:pt-24'>
          {/* <div className='m-auto px-6 pt-4 lg:pt-32'>
            <div className='w-full flex gap-4 justify-center items-center'>
              <span className="fcd9eec8fb bfe53e640d c2cc050fb8 a84c4cb7ce" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px"><path d="M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25m0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18m22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0m-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0m-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25m0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75z"></path></svg></span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px"><path d="m21.684 9.443-1.7-3.79c-.42-1.128-1.542-1.905-2.794-1.903H6.809a3 3 0 0 0-2.811 1.947L2.316 9.443a.75.75 0 1 0 1.368.614l1.7-3.79c.238-.63.798-1.018 1.424-1.017h10.383a1.5 1.5 0 0 1 1.407.973l1.718 3.834a.75.75 0 1 0 1.368-.614M.75 16.468V18a2.25 2.25 0 0 0 4.5 0v-1.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 1-1.5 0v-1.532a.75.75 0 0 0-1.5 0m21 0V18a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 0-1.5 0V18a2.25 2.25 0 0 0 4.5 0v-1.532a.75.75 0 0 0-1.5 0M19.875 13.5a.375.375 0 0 1-.375-.375.75.75 0 0 0 1.5 0c0-.621-.504-1.125-1.125-1.125a.75.75 0 0 0 0 1.5m.375-.375a.375.375 0 0 1-.375.375.75.75 0 0 0 0-1.5c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 0 1.5 0m-.375-.375c.207 0 .375.168.375.375a.75.75 0 0 0-1.5 0c0 .621.504 1.125 1.125 1.125a.75.75 0 0 0 0-1.5m-.375.375c0-.207.168-.375.375-.375a.75.75 0 0 0 0 1.5c.621 0 1.125-.504 1.125-1.125a.75.75 0 0 0-1.5 0M4.125 12C3.504 12 3 12.504 3 13.125a.75.75 0 0 0 1.5 0 .375.375 0 0 1-.375.375.75.75 0 0 0 0-1.5m1.125 1.125c0-.621-.504-1.125-1.125-1.125a.75.75 0 0 0 0 1.5.375.375 0 0 1-.375-.375.75.75 0 0 0 1.5 0M4.125 14.25c.621 0 1.125-.504 1.125-1.125a.75.75 0 0 0-1.5 0c0-.207.168-.375.375-.375a.75.75 0 0 0 0 1.5M3 13.125c0 .621.504 1.125 1.125 1.125a.75.75 0 0 0 0-1.5c.207 0 .375.168.375.375a.75.75 0 0 0-1.5 0M2.75 10.5h18.5c.69 0 1.25.56 1.25 1.25v3.75a.25.25 0 0 1-.25.25H1.75a.25.25 0 0 1-.25-.25v-3.75c0-.69.56-1.25 1.25-1.25m0-1.5A2.75 2.75 0 0 0 0 11.75v3.75c0 .966.784 1.75 1.75 1.75h20.5A1.75 1.75 0 0 0 24 15.5v-3.75A2.75 2.75 0 0 0 21.25 9z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px"><path d="m20.505 7.5-15.266.022.672.415-1.1-2.2a.75.75 0 0 0-.638-.414l-2.293-.1C.82 5.228-.003 6.06.003 7.083c.002.243.051.484.146.709l2.072 4.68a2.95 2.95 0 0 0 2.701 1.778h4.043l-.676-1.075-2.484 5.168A1.83 1.83 0 0 0 7.449 21h2.099a1.85 1.85 0 0 0 1.419-.664l5.165-6.363-.582.277h4.956c1.82.09 3.399-1.341 3.49-3.198l.004-.134a3.426 3.426 0 0 0-3.44-3.419l-.074.001zm.02 1.5h.042a1.924 1.924 0 0 1 1.933 1.914l-.002.065a1.866 1.866 0 0 1-1.955 1.772l-4.993-.001a.75.75 0 0 0-.582.277l-5.16 6.355a.35.35 0 0 1-.26.118h-2.1a.336.336 0 0 1-.3-.49l2.493-5.185a.75.75 0 0 0-.676-1.075H4.924a1.45 1.45 0 0 1-1.328-.878l-2.07-4.676a.35.35 0 0 1 .326-.474l2.255.1-.638-.415 1.1 2.2a.75.75 0 0 0 .672.415L20.507 9zm-4.202-1.24-2.992-4.02A1.85 1.85 0 0 0 11.85 3H9.783a1.85 1.85 0 0 0-1.654 2.672l1.439 2.91a.75.75 0 0 0 1.344-.664l-1.44-2.911a.35.35 0 0 1 .312-.507h2.066a.35.35 0 0 1 .279.14l2.99 4.017a.75.75 0 1 0 1.203-.896z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px"><path d="M13.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M15 3a3 3 0 1 0-6 0 3 3 0 0 0 6 0m6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0M6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0M21 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0m-9-3.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0M6 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0m10.066 1.277a7.5 7.5 0 0 1-3.077 2.05.75.75 0 0 0 .498 1.415 9 9 0 0 0 3.693-2.46.75.75 0 1 0-1.114-1.005m1.798-6.466c.177.922.183 1.869.015 2.792a.75.75 0 1 0 1.476.268c.2-1.106.194-2.24-.019-3.344a.75.75 0 1 0-1.472.284m-5.337-5.784a7.5 7.5 0 0 1 3.54 2.196.75.75 0 0 0 1.113-1.004 9 9 0 0 0-4.247-2.636.75.75 0 1 0-.406 1.444M6.434 6.223a7.5 7.5 0 0 1 3.539-2.196.75.75 0 1 0-.406-1.444A9 9 0 0 0 5.32 5.219a.75.75 0 0 0 1.114 1.004M4.636 12.69a7.6 7.6 0 0 1 0-2.878.75.75 0 1 0-1.472-.284 9.1 9.1 0 0 0 0 3.446.75.75 0 0 0 1.472-.284m4.876 5.639a7.5 7.5 0 0 1-3.035-2.005.75.75 0 0 0-1.106 1.014 9 9 0 0 0 3.641 2.405.75.75 0 1 0 .5-1.414M7.31 21.872A1.5 1.5 0 0 0 8.672 24h6.656a1.5 1.5 0 0 0 1.362-2.128l-3.314-8.217c-.361-.785-1.252-1.114-2.005-.767a1.5 1.5 0 0 0-.733.734l-3.343 8.283zm1.377.595 3.328-8.25-.015.033 3.313 8.217.015.033H8.672z"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px"><path d="M21.75 15.5V8a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0m-16.5 0V8a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0M3 8.75h3a.75.75 0 0 0 0-1.5H3a.75.75 0 0 0 0 1.5m6.75 6.75v-6a.75.75 0 0 1 1.5 0v6a.75.75 0 0 0 1.5 0v-6a2.25 2.25 0 0 0-4.5 0v6a.75.75 0 0 0 1.5 0M9 13.25h3a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5m5.304-4.971 3 7.5a.75.75 0 0 0 1.392-.557l-3-7.5a.75.75 0 0 0-1.392.557m3-.558-3 7.5a.75.75 0 0 0 1.392.557l3-7.5a.75.75 0 0 0-1.392-.557M.75 5h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5m0 15h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5"></path></svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50px"><path d="M9.75 9a2.25 2.25 0 1 1 3 2.122 2.25 2.25 0 0 0-1.5 2.122v1.006a.75.75 0 0 0 1.5 0v-1.006c0-.318.2-.602.5-.708A3.75 3.75 0 1 0 8.25 9a.75.75 0 1 0 1.5 0M12 16.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12m1.5 0c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12"></path></svg>
              <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><path d="M22.502 13.5v8.25a.75.75 0 0 1-.75.75h-19.5a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.752 3h-19.5a2.25 2.25 0 0 0-2.25 2.25v16.5A2.25 2.25 0 0 0 2.252 24h19.5a2.25 2.25 0 0 0 2.25-2.25V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.752a.75.75 0 0 0 0 1.5zM7.502 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zm10.5 0V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0z"></path></svg>
              <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><path d="M21.75 12c0 5.385-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25s9.75 4.365 9.75 9.75zm1.5 0C23.25 5.787 18.213.75 12 .75S.75 5.787.75 12 5.787 23.25 12 23.25 23.25 18.213 23.25 12zm-10.5 0V8.25a.75.75 0 0 0-1.5 0V12a.75.75 0 0 0 1.5 0zm-1.28.53l4.687 4.688a.75.75 0 0 0 1.06-1.06L12.53 11.47a.75.75 0 0 0-1.06 1.06z"></path></svg>
            </div>
          </div> */}
          <div className='w-full px-[10%]'>
            <div className='references w-full'>
              <div className='flex flex-col'>
                <h1 className='text-3xl font-[700] text-black py-8 mt-4'>Our service gives you access to the biggest brands in car rental.</h1>
                <div className='flex justify-start items-center gap-12 flex-wrap lg:flex-nowrap'>
                  {/* <div className='flex flex-col justify-center'> */}
                    {references.map((reference) => (
                      <div key={reference.id} className='flex flex-col m-auto text-center'>
                        <img src={reference.logo} className='w-auto h-8 object-contain shadow-lg' />
                        <p className='mt-4'>{reference.heading}</p>
                      </div>
                    ))}
                  {/* </div> */}
                </div>
              </div>
            </div>
            <div className='reviews flex flex-nowrap mt-16 lg:flex-wrap'>
              <h2 className="text-3xl text-black font-semibold mb-6">Over 5 million Customer Reviews</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                      <img
                        src={review.img}
                        alt={review.title}
                        className="w-[40%] h-auto rounded-sm object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{review.title}</h3>
                        <div className="flex space-x-1">{getStarRating(review.score)}</div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.content}</p>
                  </div>
                ))}
              </div>
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
