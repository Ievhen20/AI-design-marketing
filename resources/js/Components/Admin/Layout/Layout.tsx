// resources/js/Components/Admin/Layout/Layout.tsx
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6 overflow-auto">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
