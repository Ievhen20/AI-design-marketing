import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function Navbar() {
  const user = usePage().props.auth.user;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { url } = usePage();

  // Create a ref to track the user dropdown area
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Handler to set the active navbar item
  const handleNavItemClick = (index: number) => {
    setActiveIndex(index);
  };

  const navItems = [
    { label: 'Hired Car', route: '/hired-car' },
    { label: 'Hired Van', route: '/hired-van' },
    { label: 'About Us', route: '/about' },
    { label: 'Blog', route: '/blog' },
    { label: 'Contact', route: '/contact' },
  ];

  // Effect to set the active index based on the current route when the page loads
  useEffect(() => {
    const activeItem = navItems.findIndex(item => url.includes(item.route));
    setActiveIndex(activeItem !== -1 ? activeItem : null);
  }, [url]);

  // Effect to close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

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
        <li className="relative" ref={dropdownRef}>
          <button
            className="text-base font-medium ml-4 text-gray-400"
            onClick={toggleDropdown}
          >
            {user.name}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 py-2 border border-gray-200 z-50">
              <ResponsiveNavLink href={route('profile.edit')}>
                Profile
              </ResponsiveNavLink>
              <ResponsiveNavLink
                method="post"
                href={route('logout')}
                as="button"
              >
                Log Out
              </ResponsiveNavLink>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}
