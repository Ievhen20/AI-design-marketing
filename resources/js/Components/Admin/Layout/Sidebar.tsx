import { FC, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";

interface SidebarProps {
  isSidebarOpen: boolean;
}

interface User {
  user_type: string;
  email: string;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarOpen }) => {

  const { user }: { user: User | null } = usePage().props.auth || {};
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isVehiclesOpen, setIsVehiclesOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);

  // Toggle functions for parent navigation items
  const toggleCompany = () => setIsCompanyOpen(!isCompanyOpen);
  const toggleVehicles = () => setIsVehiclesOpen(!isVehiclesOpen);
  const toggleUsers = () => setIsUsersOpen(!isUsersOpen);

  return (
    <div
      className={`fixed top-0 left-0 w-64 h-full bg-[#f8f4f3] transition-transform duration-300 ease-in-out z-10 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center p-4 border-b border-b-gray-800">
        <h2 className="font-bold text-2xl">
          LOREM <span className="bg-[#a76af7] text-white px-2 rounded-md">IPSUM</span>
        </h2>
      </div>
      
      <div className="navigation">
        <div className="dashboard">
          <button
              className="w-full flex gap-2 text-left font-medium px-[16px] py-[8px] text-white bg-[#a76af7] hover:text-[#f84525] focus:outline-none"
            >
              <FontAwesomeIcon icon={faHome} className="text-xl" />
              Dashboard
            </button>
        </div>
        {user?.user_type === "O" && (
          <div className="company">
            <button className="w-full text-left font-medium px-[16px] py-[8px] text-white bg-[#6c757d] hover:text-[#f84525] focus:outline-none"
              onClick={toggleCompany}
            >
              Nations & Companies
            </button>
            <div
              className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${
                isCompanyOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {isCompanyOpen && (
                <div className="w-full bg-[#c2c7d0]">
                  <Link href="/admin/countries" className="w-full block bg-[#c2c7d0] py-[6px] text-white hover:text-[#f84525]">
                    <div className="pt-1 py-2 border-l-[6px] border-l-white px-[16px]">
                      Countries
                    </div>
                  </Link>
                  <Link href="/admin/new-company" className="w-full block bg-[#c2c7d0] py-[6px] text-white hover:text-[#f84525]">
                    <div className="pt-1 py-2 border-l-[6px] border-l-white px-[16px]">
                      New Company
                    </div>
                  </Link>
                  <Link href="/admin/companies" className="w-full block bg-[#c2c7d0] py-[6px] text-white hover:text-[#f84525]">
                    <div className="pt-1 py-2 border-l-[6px] border-l-white px-[16px]">
                      Company List
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="vehicles">
          <button
            className="w-full text-left font-medium px-[16px] py-[8px] text-white bg-[#6c757d] hover:text-[#f84525] focus:outline-none"
            onClick={toggleVehicles}
          >
            Vehicles
          </button>
          <div
            className={`w-full transition-all duration-300 ease-in-out overflow-hidden ${
              isVehiclesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {isVehiclesOpen && (
              <div className="w-full bg-[#c2c7d0]">
                <Link href="/admin/cars" className="w-full block bg-[#c2c7d0] py-[6px] text-white hover:text-[#f84525]">
                  <div className="pt-1 py-2 border-l-[6px] border-l-white px-[16px]">
                    CarList
                  </div>
                </Link>
                <Link href="/admin/vans" className="w-full block bg-[#c2c7d0] py-[6px] text-white hover:text-[#f84525]">
                  <div className="pt-1 py-2 border-l-[6px] border-l-white px-[16px]">
                    VanList
                  </div>
                </Link>
                <Link href="/child-3" className="w-full block bg-[#c2c7d0] py-[6px] text-white hover:text-[#f84525]">
                  <div className="pt-1 py-2 border-l-[6px] border-l-white px-[16px]">
                    VehicleTypes
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="users">
          <button
            className="w-full text-left font-medium px-[16px] py-[8px] text-white bg-[#6c757d] hover:text-[#f84525] focus:outline-none"
            onClick={toggleUsers}
          >
            Plans & Orders
          </button>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ml-4 ${
              isUsersOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {isUsersOpen && (
              <div className="space-y-2">
                <Link href="/admin/plans" className="block text-gray-600 hover:text-[#f84525]">Manage Plans</Link>
                <Link href="/child-b" className="block text-gray-600 hover:text-[#f84525]">Orders</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
