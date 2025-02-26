import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import Layout from "@/Components/Admin/Layout/Layout";

interface Plan {
  id: number;
  plan_name: string;
  price_id: string;
  price: number;
  level: number;
  features: any;
}

const Plans: React.FC = () => {
  const plans = usePage().props;

  const { data, setData, post, processing, reset } = useForm({
    id: "",
    plan_name: "",
    price_id: "",
    price: "",
    level: "",
    features: "",
  });

  return (
    <Layout>
      <div className="p-4">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-bold">Plans & Billings</h1>
          <button onClick={() => ""} className="bg-purple-600 text-white px-4 py-1 rounded-md">
            New +
          </button>
        </div>

        <table className="w-full border border-gray-300 mt-4">
          <thead className="bg-purple-300 text-[#171717]">
            <tr>
              <th className="p-2">No</th>
              <th className="p-2">Plan name</th>
              <th className="p-2">Price ID</th>
              <th className="p-2">Price</th>
              <th className="p-2">Level</th>
              <th className="p-2">Features</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {plans.length > 0 ? (
              plans.map((plan, index) => (
                <tr key={plan.id} className="border border-gray-300">
                  <td className="p-2 text-cemter">{index + 1}</td>
                  <td className="p-2">{plan.plan_name}</td>
                  <td className="p-2">{plan.price_id}</td>
                  <td className="p-2">{plan.price}</td>
                  <td className="p-2">{plan.level}</td>
                  <td className="p-2">${plan.features}</td>
                  <td className="p-2" data-id={plan.id}>
                    <button onClick={() => ""} className="bg-blue-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => ""} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-2 text-center bg-white">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Plans;
