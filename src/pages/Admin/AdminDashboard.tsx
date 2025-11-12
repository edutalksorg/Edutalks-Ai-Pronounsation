import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-700">
        Welcome to the admin dashboard. Use the side menu to manage instructors,
        referrals, and transactions.
      </p>
    </div>
  );
};

export default AdminDashboard;
