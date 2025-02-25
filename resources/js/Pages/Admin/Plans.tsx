import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import Layout from "@/Components/Admin/Layout/Layout";

const Plans: React.FC = () => {
  const plans = usePage().props;

  return (
    <Layout>
      <div>
        Plan Management
      </div>
    </Layout>
  )
}

export default Plans;
