import React from 'react';
import { useForm } from '@inertiajs/react';
import Layout from '@/Components/Admin/Layout/Layout';

const Create = () => {
  const { data, setData, post, errors } = useForm({
    country_name: '',
    city: '',
    com_name: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/create-company');
  };

  return (
    <Layout>
      {/* <Head title="Create Company" /> */}
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold text-gray-900">Create New Company</h1>
        <p className="mt-2 text-gray-600">Please provide the necessary details below to create a new company.</p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label htmlFor="country_name" className="block text-sm font-medium text-gray-700">Country Name</label>
            <input
              type="text"
              id="country_name"
              name="country_name"
              value={data.country_name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              placeholder="Enter country name"
            />
            {errors.country_name && <p className="text-red-500 text-xs">{errors.country_name}</p>}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={data.city}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              placeholder="Enter city"
            />
            {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="com_name" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              id="com_name"
              name="com_name"
              value={data.com_name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              placeholder="Enter company name"
            />
            {errors.com_name && <p className="text-red-500 text-xs">{errors.com_name}</p>}
          </div>

          <div className="mt-4">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Create Company
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Create;
