// resources/js/Components/Admin/Layout/Header.tsx
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Admin Dashboard</div>
            <div>
                {/* Add your user profile or notifications here */}
            </div>
        </header>
    );
};

export default Header;
