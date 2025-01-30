import Layout from "@/Components/Admin/Layout/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome to the Admin Dashboard</h1>
        <p className="mt-4 text-gray-600">Here is your dashboard content.</p>
      </div>
    </Layout>
  );
};

export default Dashboard;
