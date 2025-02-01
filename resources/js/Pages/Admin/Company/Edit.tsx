import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Layout from '@/Components/Admin/Layout/Layout';

const EditCompany: React.FC<{ company: any }> = ({ company }) => {
  const { data, setData, post, errors } = useForm({
    country_name: company.country_name,
    city: company.city,
    com_name: company.com_name
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/admin/update-company/${company.id}`);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">EditCompany Company</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label htmlFor="country_name" className="block text-sm font-medium">Country Name</label>
          <input
            type="text"
            id="country_name"
            name="country_name"
            value={data.country_name}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded"
          />
          {errors.country_name && <p className="text-red-500 text-xs">{errors.country_name}</p>}
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={data.city}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded"
          />
          {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
        </div>

        <div>
          <label htmlFor="com_name" className="block text-sm font-medium">Company Name</label>
          <input
            type="text"
            id="com_name"
            name="com_name"
            value={data.com_name}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded"
          />
          {errors.com_name && <p className="text-red-500 text-xs">{errors.com_name}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
          >
            Update Company
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default EditCompany;
