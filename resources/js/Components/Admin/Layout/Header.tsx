import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTh, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ toggleSidebar, isSidebarOpen }: HeaderProps) => {
  const [isFullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "pl-64" : "pl-0"
      } py-2 px-6 ml-2 bg-[#f8f4f3] flex items-center shadow-md sticky top-0 z-5`}
    >
      <button
        onClick={toggleSidebar}
        className="text-lg text-gray-900 font-semibold"
      >
        <FontAwesomeIcon icon={faBars} className="text-xl" />
      </button>

      <div className="ml-auto flex items-center">
        <button className="text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center hover:text-gray-600">
          <i className="ri-search-line"></i>
        </button>
        
        <button
          onClick={toggleFullscreen}
          className="text-gray-400 mr-4 w-8 h-8 rounded flex items-center justify-center hover:text-gray-600"
        >
          <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Header;
