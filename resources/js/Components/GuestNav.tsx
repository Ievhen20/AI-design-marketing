import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function GuestNav() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { url } = usePage();

  // Handler to set the active navbar item
  const handleNavItemClick = (index: number) => {
    setActiveIndex(index);
  };

  const navItems = [
    { label: 'Hire a Car', route: '/hire-car' },
    { label: 'Hire a Van', route: '/hire-van' },
    { label: 'About Us', route: '/about' },
    { label: 'Blog', route: '/blog' },
    { label: 'Contact', route: '/contact' },
  ];

  // Effect to set the active index based on the current route when the page loads
  useEffect(() => {
    const activeItem = navItems.findIndex(item => url.includes(item.route));
    setActiveIndex(activeItem !== -1 ? activeItem : null);
  }, [url]);

  return (
    <div className="flex justify-center items-center">
      <ul className="list-none flex justify-center items-center">
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`relative px-[20px] py-2 cursor-pointer text-lg transition-all text-center mx-2 
              ${activeIndex === index ? 'text-lightseagreen font-semibold' : 'text-black dark:text-white'}`}
            onClick={() => handleNavItemClick(index)}
          >
            <Link
              href={item.route}
              className="block"
              onClick={() => handleNavItemClick(index)}
            >
              {item.label}
            </Link>
            <div
              className={`absolute bottom-0 left-0 h-[2px] w-0 bg-lightseagreen 
                transition-all duration-300
                ${activeIndex === index ? 'w-full' : 'hover:w-full'}`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
