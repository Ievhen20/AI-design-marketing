// resources/js/pages/Admin/Dashboard.tsx
import React from 'react';
import Layout from '@/Components/Admin/Layout/Layout';

const Dashboard: React.FC = () => {
    return (
        <Layout>
            <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-medium">Users Overview</h2>
                    <p>Total Users: 120</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-medium">Vehicles Overview</h2>
                    <p>Total Vehicles: 75</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-medium">Revenue</h2>
                    <p>$45,000</p>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
