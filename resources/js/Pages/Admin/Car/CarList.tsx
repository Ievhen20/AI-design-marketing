import Layout from '@/Components/Admin/Layout/Layout';
import React from 'react';

const CarList: React.FC = () => {

  return (
    <Layout>
      <div className="car-management">
        <div className="w-full flex gap-3 bg-[#171717] text-white">
          <div>New Car</div>
          <div className="bg-green-500 text-white px-4 py-1">+</div>
        </div>
        <div className="car-list">
          
        </div>
      </div>
    </Layout>
  ) 
}

export default CarList;
