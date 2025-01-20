import React, { useState, useEffect } from 'react';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";

import 'react-datepicker/dist/react-datepicker.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '@/Components/Header';

export default function Contact({
  auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {

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
      <Head title="Contact" />
      <div className="text-black/50 dark:bg-black dark:text-white/50">
        <div className="relative flex items-center justify-center selection:bg-[#FF2D20] selection:text-white">
          <div className="relative w-full flex flex-col px-0 py-8">
            <Header auth={auth} />
            <main className="mt-2 flex-1">
              <section
                className="w-full relative min-h-[45vh] bg-cover bg-center"
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
            </main>
          </div>
        </div>
        <section className='w-full px-6 pt-4 lg:pt-24'>
          
        </section>
        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
          Footer
        </footer>
      </div>
    </>
  );
}
