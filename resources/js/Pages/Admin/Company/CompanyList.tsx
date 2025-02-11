import { Link } from '@inertiajs/inertia-react';
import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Layout from '@/Components/Admin/Layout/Layout';
import Modal from '@/Components/Admin/Modal';
import DataTable from 'react-data-table-component';

const CompanyList: React.FC<{ companies: any[]; totalCompanies: number; perPage: number; currentPage: number }> = ({ companies, totalCompanies, perPage, currentPage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<number | null>(null);
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(perPage);

  useEffect(() => {
    fetchCompanies(currentPageState, rowsPerPage);
  }, [currentPageState, rowsPerPage]);

  const fetchCompanies = (page: number, perPage: number) => {
    Inertia.post('/admin/fetch-companies', { page, perPage }, { preserveState: true });
  };

  const openModal = (companyId: number) => {
    setCompanyToDelete(companyId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCompanyToDelete(null);
  };

  const confirmDelete = () => {
    if (companyToDelete !== null) {
      Inertia.delete(`/admin/delete-company/${companyToDelete}`);
      closeModal();
    }
  };

  // Columns for DataTable
  const columns = [
    {
      name: 'ID',
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: 'Country',
      selector: (row: any) => row.country_name,
      sortable: true,
    },
    {
      name: 'City',
      selector: (row: any) => row.city,
      sortable: true,
    },
    {
      name: 'Company Name',
      selector: (row: any) => row.com_name,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row: any) => (
        <div className="flex space-x-4">
          <Link href={`/admin/edit-company/${row.id}`} className="text-blue-500">
            Edit
          </Link>
          <button onClick={() => openModal(row.id)} className="text-red-500">
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPageState(page);
  };

  const handlePerPageChange = (newPerPage: number, page: number) => {
    setRowsPerPage(newPerPage);
    setCurrentPageState(page);
  };

  return (
    <div>
      <Layout>
        <div className="flex gap-3 items-center">
          <h1 className="text-2xl font-bold">Company List</h1>
          <Link href="/admin/new-company" className="inline-block text-white px-4 py-1 bg-[#a76af7] rounded-md">
            New +
          </Link>
        </div>
        <div className="mt-6">
          <DataTable
            columns={columns}
            data={companies}
            pagination
            paginationServer
            paginationTotalRows={totalCompanies}
            paginationPerPage={rowsPerPage}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerPageChange}
            sortIcon={<span>&#8597;</span>}
            highlightOnHover
            responsive
            customStyles={{
              headCells: {
                style: {
                  fontWeight: 'bold',
                },
              },
            }}
            paginationDefaultPage={currentPageState}
          />
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmDelete} title="Delete Company">
          <p>Are you sure you want to delete this company? This action cannot be undone.</p>
        </Modal>
      </Layout>
    </div>
  );
};

export default CompanyList;
