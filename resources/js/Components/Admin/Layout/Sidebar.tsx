import { FC } from "react";
import { Link } from "@inertiajs/react";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-[#f8f4f3] p-4 transition-transform duration-300 ease-in-out z-50 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center pb-4 border-b border-b-gray-800">
        <h2 className="font-bold text-2xl">
          LOREM <span className="bg-[#f84525] text-white px-2 rounded-md">IPSUM</span>
        </h2>
      </div>
      
      <ul className="mt-4">
        <span className="text-gray-400 font-bold">ADMIN</span>
        <li className="mb-1 group">
          <Link
            href="#"
            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md"
          >
            <i className="ri-home-2-line mr-3 text-lg"></i>
            <span className="text-sm">Dashboard</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
