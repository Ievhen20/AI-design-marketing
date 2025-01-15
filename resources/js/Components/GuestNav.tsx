import React, { useState } from 'react';

export default function GuestNav() {
  // State to track the active navbar item
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Handler to set the active navbar item
  const handleNavItemClick = (index: number) => {
    setActiveIndex(index);
  };

  const navItems = ['Hire a Car', 'Hire a Van', 'About Us', 'Blog', 'Contact'];

  return (
    <div className="flex justify-center items-center">
      <ul className="list-none flex justify-center items-center">
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`relative px-[20px] py-2 cursor-pointer text-lg transition-all text-center mx-2 
              ${activeIndex === index ? 'text-lightseagreen font-semibold' : 'text-black dark:text-white'}
            `}
            onClick={() => handleNavItemClick(index)} 
          >
            {item}
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
