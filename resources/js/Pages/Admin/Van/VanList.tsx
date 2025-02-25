import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Layout from "@/Components/Admin/Layout/Layout";
import DeleteModal from '@/Components/DeleteModal';

interface Van {
  id: number;
  model: string;
  company: { id: number; name: string };
  manufactured_year: number;
  fuel_type: string;
  cost: number;
  image: string;
}

interface Company {
  com_name: string;
  id: number;
}

const VanList: React.FC = () => {
  const { vans, companies } = usePage().props;
  const [showModal, setShowModal] = useState(false);
  const [editVan, setEditVan] = useState<Van | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const currentYear = new Date().getFullYear();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [vanToRemove, setVanToRemove] = useState<number | null>(null);

  const { data, setData, post, processing, reset } = useForm({
    id: "",
    model: "",
    company_id: "",
    manufactured_year: "",
    fuel_type: "",
    cost: "",
    image: null as File | null,
  });

  const handleFileChange = (e) => {
    setData('image', e.target.files[0]);
  };

  const openModal = (van: Van | null = null) => {
    if (van) {
      setEditVan(van);
      setData({
        id: van.id.toString(),
        model: van.model,
        company_id: van.company.id.toString(),
        manufactured_year: van.manufactured_year.toString(),
        fuel_type: van.fuel_type,
        cost: van.cost.toString(),
        image: null,
      });
    } else {
      reset();
      setEditVan(null);
    }
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    reset();
    setErrors({});
  };

  const validateForm = () => {
    let newErrors: Record<string, string> = {};
  
    if (!data.model.trim()) newErrors.model = "Model is required.";
    if (!data.company_id) newErrors.company_id = "Company is required.";
    if (!data.fuel_type) newErrors.fuel_type = "Fuel type is required.";
    if (!data.manufactured_year) {
      newErrors.manufactured_year = "Year is required.";
    } else {
      const year = Number(data.manufactured_year);
      if (isNaN(year) || year < 1950 || year > currentYear) {
        newErrors.manufactured_year = `Year must be between 1950 and ${currentYear}.`;
      }
    }
    if (!data.cost) {
      newErrors.cost = "Cost is required.";
    } else if (Number(data.cost) <= 0) {
      newErrors.cost = "Cost must be a positive number.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });

    if (editVan) {
      post(`/admin/vans/update/${editVan.id}`, {
        data: formData,
        onSuccess: closeModal,
      });
    } else {
      post("/admin/vans/store", {
        data: formData,
        onSuccess: closeModal,
      });
    }
  };

  const handleRemove = (vanId: number) => {
    setVanToRemove(vanId);
    setShowConfirmModal(true);
  };
  
  const confirmRemove = () => {
    if (vanToRemove) {
      post(route('admin.vans.delete', vanToRemove), {
        method: 'delete',
        onSuccess: () => {
          setShowConfirmModal(false);
          setVanToRemove(null);
        },
        onError: (error) => {
          console.error('Error deleting van:', error);
        }
      });
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-bold">Van Management</h1>
          <button onClick={() => openModal()} className="bg-purple-600 text-white px-4 py-1 rounded-md">
            New +
          </button>
        </div>

        <table className="w-full border border-gray-300 mt-4">
          <thead className="bg-purple-300 text-[#171717]">
            <tr>
              <th className="p-2">No</th>
              <th className="p-2">Image</th>
              <th className="p-2">Model</th>
              <th className="p-2">Company</th>
              <th className="p-2">Year</th>
              <th className="p-2">Fuel Type</th>
              <th className="p-2">Cost</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {vans.length > 0 ? (
              vans.map((v, index) => (
                <tr key={v.id} className="border border-gray-300">
                  <td className="p-2 text-cemter">{index + 1}</td>
                  <td className="p-2">
                    {v.image ? (
                      <img src={`/storage/${v.image}`} alt={v.model} className="w-20 object-contain" />
                    ) : (
                      <img src="/assets/img/car1.png" alt="Default Van" className="w-20 object-contain" />
                    )}
                  </td>
                  <td className="p-2">{v.model}</td>
                  <td className="p-2">{v.company.com_name}</td>
                  <td className="p-2">{v.manufactured_year}</td>
                  <td className="p-2">{v.fuel_type}</td>
                  <td className="p-2">${v.cost}</td>
                  <td className="p-2" data-id={v.id}>
                    <button onClick={() => openModal(v)} className="bg-blue-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleRemove(v.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
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
      {/* Create Car Modal */}
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-300"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-md p-6 w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800" onClick={closeModal}>
              ✖
            </button>
            <h2 className="text-xl mb-3">{editVan ? "Edit Van" : "Add Van"}</h2>
              <div className="flex flex-col">
                <label className="font-medium">Model:</label>
                <input type="text" className="border p-2 rounded" value={data.model} onChange={(e) => setData("model", e.target.value)} />
                {errors.model && <span className="text-red-500">{errors.model}</span>}
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Company:</label>
                <select
                  className="border p-2 rounded"
                  value={data.company_id}
                  onChange={(e) => setData("company_id", e.target.value)}
                  required
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.com_name}
                    </option>
                  ))}
                </select>
                {errors.company_id && <span className="text-red-500">{errors.company_id}</span>}
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Fuel Type:</label>
                <select
                  className="border p-2 rounded"
                  value={data.fuel_type}
                  onChange={(e) => setData("fuel_type", e.target.value)}
                  required
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                </select>
                {errors.fuel_type && <span className="text-red-500">{errors.fuel_type}</span>}
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Manufacture Year:</label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  min="1950"
                  max={currentYear}
                  value={data.manufactured_year}
                  onChange={(e) => setData("manufactured_year", e.target.value)}
                  required
                />
                {errors.manufactured_year && <span className="text-red-500">{errors.manufactured_year}</span>}
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Price per day:</label>
                <input
                  type="number"
                  className="border p-2 rounded"
                  min="0"
                  value={data.cost}
                  onChange={(e) => setData("cost", e.target.value)}
                  required
                />
                {errors.cost && <span className="text-red-500">{errors.cost}</span>}
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Car Image:</label>
                <input type="file" name="image" className="border p-2 rounded" onChange={handleFileChange} />
              </div>
              <button type="submit" disabled={processing} onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 w-full mt-2 rounded">
                {processing ? "Saving..." : "Save"}
              </button>
          </div>
        </div>
      )}
      {/* Remove Confirmation Modal */}
      <DeleteModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={confirmRemove}
          title="Delete Country"
          description="Are you sure you want to delete this country? This action cannot be undone."
        />
    </Layout>
  )

}

export default VanList;
