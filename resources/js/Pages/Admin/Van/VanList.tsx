import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Layout from "@/Components/Admin/Layout/Layout";

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
  const { cars, companies } = usePage().props;

  return (
    <>
      <div>
        <h1>Van List Management</h1>
      </div>
    </>
  )

}

export default VanList;
