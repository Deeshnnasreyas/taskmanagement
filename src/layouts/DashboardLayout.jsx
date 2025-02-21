import React from "react";
import { Outlet, Link } from "react-router-dom";
import { dashboardNav } from "../constants";

const DashboardLayout = () => {
  const renderSidebar = dashboardNav.map((navitems, index) => (
    <li className="mb-2" key={index}>
      <Link
        to={navitems?.link}
        className="items-center mr-2 text-sm uppercase 
              py-3 font-bold block text-white hover:text-blue-500 cursor-pointer"
      >
        {navitems?.label}
      </Link>
    </li>
  ));
  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <nav className="mt-4">
          <ul>{renderSidebar}</ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
