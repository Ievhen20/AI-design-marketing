import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Layout from "@/Components/Admin/Layout/Layout";

interface Car {
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

const CarList: React.FC = () => {
  const { cars, companies } = usePage().props;
  const [showModal, setShowModal] = useState(false);
  const [editCar, setEditCar] = useState<Car | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const currentYear = new Date().getFullYear();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [carToRemove, setCarToRemove] = useState<number | null>(null);

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

  const openModal = (car: Car | null = null) => {
    if (car) {
      setEditCar(car);
      setData({
        id: car.id.toString(),
        model: car.model,
        company_id: car.company.id.toString(),
        manufactured_year: car.manufactured_year.toString(),
        fuel_type: car.fuel_type,
        cost: car.cost.toString(),
        image: null,
      });
    } else {
      reset();
      setEditCar(null);
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
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });

    console.log("Submitting FormData:", data);

    if (editCar) {
      post(`/admin/cars/update/${editCar.id}`, {
        data: formData,
        onSuccess: closeModal,
      });
    } else {
      post("/admin/cars/store", {
        data: formData,
        onSuccess: closeModal,
      });
    }
  };

  const handleRemove = (carId: number) => {
    setCarToRemove(carId);
    setShowConfirmModal(true);
  };
  
  const confirmRemove = () => {
    if (carToRemove) {
      // Send the delete request using Inertia's post method with a DELETE method
      post(route('admin.car.delete', carToRemove), {
        method: 'delete',
        onSuccess: () => {
          setShowConfirmModal(false);
          setCarToRemove(null);
        },
        onError: (error) => {
          console.error('Error deleting car:', error);
        }
      });
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-bold">Car Management</h1>
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
            {cars.length > 0 ? (
              cars.map((car, index) => (
                <tr key={car.id} className="border border-gray-300">
                  <td className="p-2 text-cemter">{index + 1}</td>
                  <td className="p-2">
                    {car.image ? (
                      <img src={`/storage/${car.image}`} alt={car.model} className="w-20 object-contain" />
                    ) : (
                      <img src="/assets/img/car1.png" alt="Default car" className="w-20 object-contain" />
                    )}
                  </td>
                  <td className="p-2">{car.model}</td>
                  <td className="p-2">{car.company.com_name}</td>
                  <td className="p-2">{car.manufactured_year}</td>
                  <td className="p-2">{car.fuel_type}</td>
                  <td className="p-2">${car.cost}</td>
                  <td className="p-2" data-id={car.id}>
                    <button onClick={() => openModal(car)} className="bg-blue-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleRemove(car.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-2 text-center bg-white">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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
            <h2 className="text-xl mb-3">{editCar ? "Edit Car" : "Add Car"}</h2>
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
      {showConfirmModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-300" onClick={() => setShowConfirmModal(false)}>
          <div className="bg-white rounded-md p-6 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-7 right-3 text-gray-500 hover:text-gray-800" onClick={() => setShowConfirmModal(false)}>
              ✖
            </button>
            <h2 className="text-xl mb-3">Are you sure you want to remove this car?</h2>
            <div className="flex justify-between">
              <button onClick={() => setShowConfirmModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={confirmRemove} className="bg-red-500 text-white px-4 py-2 rounded">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CarList;
