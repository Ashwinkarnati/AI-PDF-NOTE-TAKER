import React from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-lg md:h-screen">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Header />
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;