import { Link } from '@inertiajs/inertia-react';
import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '@/Components/Admin/Layout/Layout';

const CompanyList: React.FC<{ companies: any[] }> = ({ companies }) => {
  return (
    <div>
      <Layout>
        <h1 className="text-2xl font-bold">Company List</h1>
        <Link href="/admin/new-company" className="mt-4 inline-block text-blue-500">Create New Company</Link>
        <div className="mt-6">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Country</th>
                <th className="px-4 py-2 border">City</th>
                <th className="px-4 py-2 border">Company Name</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td className="px-4 py-2 border">{company.id}</td>
                  <td className="px-4 py-2 border">{company.country_name}</td>
                  <td className="px-4 py-2 border">{company.city}</td>
                  <td className="px-4 py-2 border">{company.com_name}</td>
                  <td className="px-4 py-2 border">
                    <Link href={`/admin/edit-company/${company.id}`} className="text-blue-500">Edit</Link>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this company?')) {
                          Inertia.delete(`/admin/delete-company/${company.id}`);
                        }
                      }}
                      className="ml-4 text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
};

export default CompanyList;
