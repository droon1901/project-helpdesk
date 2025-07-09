"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../sidebar";
import Header from "../header";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaBars } from "react-icons/fa";
import { useEmployees } from "../karyawan/context/EmployeeContext";

const DataKaryawan = () => {
  const [activeContent, setActiveContent] = useState("Data Karyawan");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { employees, setEmployees } = useEmployees();

  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddEmployee = () => {
    router.push("/dashboard/karyawan/tambah");
  };

  const handleDeleteEmployee = (no) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.no !== no)
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`lg:flex ${
          isMobileMenuOpen ? "block" : "hidden"
        } w-56 bg-[#001f3f] text-white flex-col transition-all duration-300 ease-in-out`}
      >
        <Sidebar onMenuSelect={setActiveContent} />
      </div>

      <div className="flex-1 min-h-screen flex flex-col overflow-y-auto">
        <div className="sticky top-0 z-10 bg-gray-800 flex justify-between items-center p-4">
          {/* Hamburger untuk tampilan mobile */}
          <button className="lg:hidden text-white" onClick={toggleMobileMenu}>
            <FaBars />
          </button>
          <Header title={activeContent} />
        </div>

        <div className="p-8 flex-1">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <HeaderSection onAddEmployee={handleAddEmployee} />
            <SearchSection searchQuery={searchQuery} onSearch={handleSearch} />
            <EmployeeTable
              employees={employees}
              searchQuery={searchQuery}
              onEdit={(no) =>
                router.push(`/dashboard/karyawan/tambah?edit=${no}`)
              }
              onDelete={handleDeleteEmployee}
            />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderSection = ({ onAddEmployee }) => (
  <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between mb-6 w-full">
    <h2 className="text-3xl font-bold text-white text-center sm:text-left sm:w-auto w-full">
      Data Karyawan
    </h2>
    <button
      onClick={onAddEmployee}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-600 active:bg-green-700 focus:outline-none transition duration-150 ease-in-out mt-4 sm:mt-0 w-40 sm:w-auto"
    >
      <FaPlus className="mr-2" />
      Tambah Karyawan
    </button>
  </div>
);

const SearchSection = ({ searchQuery, onSearch }) => (
  <div className="flex flex-wrap justify-between items-center mb-6">
    <div className="flex items-center mb-4 sm:mb-0 w-full sm:w-auto">
      <span className="text-white mr-2">Show</span>
      <select className="bg-gray-900 text-white py-2 px-4 rounded-lg">
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>100</option>
      </select>
    </div>
    <div className="flex items-center w-full sm:w-auto">
      <input
        type="text"
        className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg w-full sm:w-auto"
        placeholder="Search..."
        value={searchQuery}
        onChange={onSearch}
      />
      <FaSearch className="text-white ml-2" />
    </div>
  </div>
);

const EmployeeTable = ({ employees, searchQuery, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
      <thead>
        <tr className="bg-gray-900 text-white">
          <th className="px-6 py-3 text-left">No</th>
          <th className="px-6 py-3 text-left">Nama Karyawan</th>
          <th className="px-6 py-3 text-left">Email</th>
          <th className="px-6 py-3 text-left">Divisi</th>
          <th className="px-6 py-3 text-left">Jabatan</th>
          <th className="px-6 py-3 text-left">Status</th>
          <th className="px-6 py-3 text-left">Aksi</th>
        </tr>
      </thead>
      <tbody className="text-gray-300">
        {employees
          .filter((employee) =>
            employee.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((employee) => (
            <tr key={employee.no} className="border-b border-gray-600">
              <td className="px-6 py-4">{employee.no}</td>
              <td className="px-6 py-4">{employee.name}</td>
              <td className="px-6 py-4">{employee.email}</td>
              <td className="px-6 py-4">{employee.division}</td>
              <td className="px-6 py-4">{employee.position}</td>
              <td className="px-6 py-4">{employee.status}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onEdit(employee.no)}
                  className="text-yellow-500 hover:text-yellow-300 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(employee.no)}
                  className="text-red-500 hover:text-red-300"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

const Pagination = () => (
  <div className="flex justify-between items-center mt-6 flex-wrap w-full">
    <span className="text-white mb-2 sm:mb-0 text-sm sm:text-base">
      Show 1 to 3 of 3 entries
    </span>
    <div className="flex justify-center items-center space-x-2 mt-4 sm:mt-0 w-full sm:w-auto">
      <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 active:bg-gray-800 focus:outline-none transition duration-150 ease-in-out text-sm sm:text-base">
        Previous
      </button>
      <span className="text-white text-sm sm:text-base">1</span>
      <button className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 active:bg-gray-800 focus:outline-none transition duration-150 ease-in-out text-sm sm:text-base">
        Next
      </button>
    </div>
  </div>
);

export default DataKaryawan;
