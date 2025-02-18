import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Layout from '@/Components/Admin/Layout/Layout';
import DeleteModal from '@/Components/DeleteModal';

interface Country {
  id: number;
  name: string;
  capital: string;
  language: string;
  banner: string;
  img: string;
}

const CountryList: React.FC = () => {
  const { countries } = usePage().props;
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editCountry, setEditCountry] = useState<Country | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);

  const [previewBanner, setPreviewBanner] = useState<string | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const { data, setData, post, processing, reset } = useForm({
    id: "",
    name: "",
    capital: "",
    language: "",
    banner: null as File | null,
    img: null as File | null,
  });

  const viewModal = (country: Country | null = null) => {
    if (country) {
      setEditCountry(country);
      setData({
        id: country.id.toString(),
        name: country.name,
        capital: country.capital,
        language: country.language,
        banner: null,
        img: null,
      });
      setPreviewBanner(country.banner ? `/storage/${country.banner}` : null);
      setPreviewImg(country.img ? `/storage/${country.img}` : null);
    } else {
      reset();
      setEditCountry(null);
    }
    setErrors({});
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    reset();
    setErrors({});
  }

  const handleBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('banner', file);
      setPreviewBanner(URL.createObjectURL(file));
    }
  };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('img', file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    let newErrors: Record<string, string> = {};
  
    if (!data.name.trim()) newErrors.name = "Country name is required.";
    if (!data.capital) newErrors.capital = "Capital field is required.";
    if (!data.language) newErrors.language = "Language field is required.";
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });

    if (editCountry) {
      post(`/admin/countries/update/${editCountry.id}`, {
        data: formData,
        onSuccess: closeModal,
      });
    } else {
      post("/admin/countries/store", {
        data: formData,
        onSuccess: closeModal,
      });
    }
  };

  const confirmDelete = (id: number) => {
    setSelectedCountryId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedCountryId) {
      post(`/admin/countries/delete-country/${selectedCountryId}`, {
        onSuccess: () => setDeleteModalOpen(false),
      });
    }
  };

  return (

    <>
      <Layout>
        <div className="country-list">
          <div className="flex gap-3 items-center">
            <h1 className="text-2xl font-bold">Country Management</h1>
            <button className="bg-purple-600 text-white px-4 py-1 rounded-md" onClick={() => viewModal()}>
              New +
            </button>
          </div>
          {/* Country Table */}
          <div className="countries w-full pt-8">
            <table className="w-full mt-4">
              <thead className="bg-purple-300 text-[#171717] p-2">
                <tr>
                  <th className="p-2">No</th>
                  <th className="p-2">Country Name</th>
                  <th className="p-2">Capital</th>
                  <th className="p-2">Language</th>
                  <th className="p-2">Banner</th>
                  <th className="p-2">Image</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {countries.length > 0 ? (
                  countries.map((country, index) => (
                    <tr key={country.id} className="border border-gray-300">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{country.name}</td>
                      <td className="p-2">{country.capital}</td>
                      <td className="p-2">{country.language}</td>
                      <td className="p-2">
                      {country.banner ? (
                        <img src={`/storage/${country.banner}`} alt="Banner" className="w-20 object-contain" />
                      ) : (
                        <img src="/assets/img/car1.png" alt="Default Banner" className="w-20 object-contain" />
                      )}
                      </td>
                      <td className="p-2">
                      {country.img ? (
                        <img src={`/storage/${country.img}`} alt="Picture" className="w-20 object-contain" />
                      ) : (
                        <img src="/assets/img/car3.png" alt="Default Picture" className="w-20 object-contain" />
                      )}
                      </td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => viewModal(country)}>Edit</button>
                          <button className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => confirmDelete(country.id)}>Remove</button>
                        </div>
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
        </div>
        {openModal && (
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-300"
            onClick={() => setOpenModal(false)}
          >
            <div
              className="bg-white rounded-md p-6 w-full max-w-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800" onClick={() => setOpenModal(false)}>
                ✖
              </button>
              <h2 className="text-xl mb-3">{editCountry ? "Edit Car" : "Add a new Car"}</h2>
                <div className="flex flex-col mt-4">
                  <input type="text" className="border p-2 rounded" value={data.name} onChange={(e) => setData("name", e.target.value)} placeholder="Name of Country" />
                  {errors.name && <span className="text-red-500">{errors.name}</span>}
                </div>
                <div className="flex flex-col mt-4">
                  <input type="text" className="border p-2 rounded" value={data.capital} onChange={(e) => setData("capital", e.target.value)} placeholder="Capital of Country" />
                  {errors.capital && <span className="text-red-500">{errors.name}</span>}
                </div>
                <div className="flex flex-col mt-4">
                  <input type="text" className="border p-2 rounded" value={data.language} onChange={(e) => setData("language", e.target.value)} placeholder="Type a language" />
                  {errors.language && <span className="text-red-500">{errors.name}</span>}
                </div>
                <div className="flex gap-4 w-full justify-around mt-8">
                  <div className="flex flex-col">
                    <label className="font-medium">Banner:</label>
                    <div className="relative group">
                      <div className="banner-img cursor-pointer flex justify-center items-center min-h-32">
                        <img src={previewBanner || "/assets/img/car1.png"} alt="Banner" className="w-48 border rounded object-contain" />
                      </div>
                      <input type="file" id="bannerInput" name="banner" className="hidden" onChange={handleBanner} />
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="transparent text-white px-4 py-1 rounded border-[1px] border-white" onClick={() => document.getElementById('bannerInput')?.click()}>Set Banner</button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium">Picute:</label>
                    <div className="relative group">
                      <div className="banner-img cursor-pointer flex justify-center items-center min-h-32">
                        <img src={previewImg || "/assets/img/car2.png"} alt="Picture" className="w-48 border rounded object-contain" />
                      </div>
                      <input type="file" id="imgInput" name="img" className="hidden" onChange={handleImg} />
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="transparent text-white px-4 py-1 rounded border-[1px] border-white" onClick={() => document.getElementById('imgInput')?.click()}>Set picture</button>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={processing} onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 w-full mt-2 rounded">
                  {processing ? "Saving..." : "Save"}
                </button>
            </div>
          </div>
        )}
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title="Delete Country"
          description="Are you sure you want to delete this country? This action cannot be undone."
        />
      </Layout>
    </>

  )

}

export default CountryList;
