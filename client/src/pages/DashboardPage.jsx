import React from "react";
import { FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AuthSlicePath } from "../redux/slice/auth.slice";

const DashboardPage = () => {
  const authUser = useSelector(AuthSlicePath);

  return (
    <>
      {/* Page Heading */}
      <div className="px-4 pt-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here’s a quick overview of your employee data.
        </p>
      </div>

      {/* Stats Card */}
      <div className="flex justify-start py-5 px-4">
        <div className="w-80 p-5 rounded-2xl bg-white transition-all duration-300 border border-gray-200 flex justify-between items-center">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
            <FaUsers className="text-4xl" />
          </div>
          <div className="flex flex-col items-end">
            <p className="text-lg font-semibold text-gray-600">Total Employees</p>
            <p className="text-4xl font-bold text-gray-800">
              {authUser?.total_emp || 0}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
