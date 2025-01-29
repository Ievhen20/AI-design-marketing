// resources/js/Components/Admin/Layout/Sidebar.tsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react'; // Smooth transitions for child items

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); // Controls the overall sidebar
    const [activeParent, setActiveParent] = useState<string | null>(null); // Tracks the open parent nav item

    // Handle sidebar toggle (open/close)
    const handleToggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Toggle visibility of child nav items and rotate icon
    const handleToggleSubmenu = (parent: string) => {
        // Close the parent if it's already active, otherwise open it
        setActiveParent(activeParent === parent ? null : parent);
    };

    return (
        <div className={`w-64 bg-gray-800 text-white ${isOpen ? 'block' : 'hidden'} md:block`}>
            <div className="flex justify-between items-center p-4">
                <button onClick={handleToggleSidebar} className="text-white">
                    <i className={`fa fa-align-justify ${isOpen ? 'rotate-180' : ''} transition-transform`} aria-hidden="true"></i>
                </button>
            </div>
            <nav className="mt-6">
                <ul>
                    {/* Parent Navigation Item - Users */}
                    <li className="text-gray-300">
                        <button
                            onClick={() => handleToggleSubmenu('users')}
                            className="w-full text-left px-4 py-2 hover:bg-gray-700 focus:outline-none flex justify-between items-center"
                        >
                            Users
                            <i className={`fa fa-chevron-down transition-transform ${activeParent === 'users' ? 'rotate-180' : ''}`}></i>
                        </button>
                        <Transition
                            show={activeParent === 'users'}
                            enter="transition-all duration-600 ease-in-out"
                            enterFrom="max-h-0 opacity-0"
                            enterTo="max-h-screen opacity-100"
                            leave="transition-all duration-200 ease-in-out"
                            leaveFrom="opacity-100 max-h-screen"
                            leaveTo="opacity-0 max-h-0"
                        >
                            <ul className="pl-6 space-y-2">
                                <li>
                                    <Link to="/admin/users" className="text-gray-400 hover:text-white">Users List</Link>
                                </li>
                                <li>
                                    <Link to="/admin/customers" className="text-gray-400 hover:text-white">Customers</Link>
                                </li>
                            </ul>
                        </Transition>
                    </li>

                    {/* Parent Navigation Item - Vehicles */}
                    <li className="text-gray-300">
                        <button
                            onClick={() => handleToggleSubmenu('vehicles')}
                            className="w-full text-left px-4 py-2 hover:bg-gray-700 focus:outline-none flex justify-between items-center"
                        >
                            Vehicles
                            <i className={`fa fa-chevron-down transition-transform ${activeParent === 'vehicles' ? 'rotate-180' : ''}`}></i>
                        </button>
                        <Transition
                            show={activeParent === 'vehicles'}
                            enter="transition-all duration-300 ease-in-out"
                            enterFrom="max-h-0 opacity-0"
                            enterTo="max-h-screen opacity-100"
                            leave="transition-all duration-200 ease-in-out"
                            leaveFrom="opacity-100 max-h-screen"
                            leaveTo="opacity-0 max-h-0"
                        >
                            <ul className="pl-6 space-y-2">
                                <li>
                                    <Link to="/admin/vehicles" className="text-gray-400 hover:text-white">Vehicle List</Link>
                                </li>
                                <li>
                                    <Link to="/admin/vehicle-types" className="text-gray-400 hover:text-white">Vehicle Types</Link>
                                </li>
                            </ul>
                        </Transition>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
