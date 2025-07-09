"use client";
import React, { useState } from "react";
import Sidebar from "../sidebar";
import Header from "../header";
import {
  FaSave,
  FaRedo,
  FaTrash,
  FaEdit,
  FaSearch,
  FaBars,
} from "react-icons/fa";

const Overview = () => {
  const [activeContent, setActiveContent] = useState("Overview");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [divisi, setDivisi] = useState([
    { id: 1, name: "Divisi 1" },
    { id: 2, name: "Divisi 2" },
    { id: 3, name: "Divisi 3" },
  ]);
  const [newDivisi, setNewDivisi] = useState("");
  const [editingDivisi, setEditingDivisi] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSave = () => {
    if (editingDivisi !== null) {
      const updatedDivisi = divisi.map((d) =>
        d.id === editingDivisi.id ? { ...d, name: newDivisi } : d
      );
      setDivisi(updatedDivisi);
      setEditingDivisi(null);
    } else {
      const newId = divisi.length ? divisi[divisi.length - 1].id + 1 : 1;
      setDivisi([...divisi, { id: newId, name: newDivisi }]);
    }
    setNewDivisi("");
  };

  const handleEdit = (id) => {
    const divisiToEdit = divisi.find((d) => d.id === id);
    setEditingDivisi(divisiToEdit);
    setNewDivisi(divisiToEdit.name);
  };

  const handleDelete = (id) => {
    setDivisi(divisi.filter((d) => d.id !== id));
  };

  const handleSearch = () => {
    if (searchQuery) {
      setDivisi(
        divisi.filter((d) =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;

  const paginatedDivisi = divisi.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (endIndex < divisi.length) setCurrentPage(currentPage + 1);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev); // Toggle status sidebar pada mobile
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-0">
            {/* Form Divisi */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-xl text-white">
              <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">
                Form Divisi
              </h3>
              <div className="mb-4">
                <label htmlFor="divisi" className="block text-sm font-medium">
                  Divisi
                </label>
                <input
                  type="text"
                  id="divisi"
                  value={newDivisi}
                  onChange={(e) => setNewDivisi(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border bg-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-700"
                  placeholder="Masukkan nama divisi"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end gap-4 mt-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-600 active:bg-green-700 focus:outline-none transition duration-150 ease-in-out mt-4 sm:mt-0 w-full sm:w-auto"
                  onClick={handleSave}
                >
                  <FaSave /> Simpan
                </button>

                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-gray-600 active:bg-green-700 focus:outline-none transition duration-150 ease-in-out mt-4 sm:mt-0 w-full sm:w-auto"
                  onClick={() => setNewDivisi("")}
                >
                  <FaRedo /> Reset
                </button>
              </div>
            </div>

            {/* Data Divisi */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-xl text-white">
              <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">
                Data Divisi
              </h3>

              {/* Show Entries & Search */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <div className="flex items-center mb-4 sm:mb-0">
                  <span className="text-sm text-gray-400">Show</span>
                  <select className="ml-2 p-2 border border-gray-300 rounded-md bg-gray-900 text-white">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                  <span className="ml-2 text-sm text-gray-400">entries</span>
                </div>

                {/* Form Pencarian */}
                <div className="flex items-center w-full sm:w-auto mt-4 sm:mt-0">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 w-full sm:w-auto border border-gray-300 rounded-md bg-gray-200 text-gray-700"
                    placeholder="Cari divisi..."
                  />
                  <button
                    onClick={handleSearch}
                    className="ml-2 p-2 bg-blue-500 text-white rounded-md flex items-center justify-center hover:bg-blue-600 active:bg-green-700 focus:outline-none transition duration-150 ease-in-out"
                  >
                    <FaSearch />
                  </button>
                </div>
              </div>

              {/* Tabel Data Divisi */}
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-gray-900 border border-gray-300 rounded-lg shadow-md">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="p-4 text-left text-sm font-semibold text-white w-1/4 border-r border-gray-600">
                        No
                      </th>
                      <th className="p-4 text-left text-sm font-semibold text-white w-1/2 border-r border-gray-600">
                        Divisi
                      </th>
                      <th className="p-4 text-left text-sm font-semibold text-white w-1/4">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {divisi.map((item, index) => (
                      <tr key={item.id} className="border-b border-gray-600">
                        <td className="p-4 text-sm text-white border-r border-gray-600">
                          {index + 1}
                        </td>
                        <td className="p-4 text-sm text-white border-r border-gray-600">
                          {item.name}
                        </td>
                        <td className="p-4 text-sm text-white flex justify-start gap-4">
                          <button
                            className="px-3 py-1 bg-yellow-500 text-white rounded-md"
                            onClick={() => handleEdit(item.id)}
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            className="px-3 py-1 bg-red-500 text-white rounded-md"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FaTrash /> Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="mt-4 flex sm:flex-row flex-col justify-center items-center gap-2 w-full">
                <button
                  onClick={handlePrevious}
                  className="bg-gray-600 text-white px-3 py-2 rounded-md text-sm w-auto hover:bg-gray-700 transition duration-150"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-400 text-center">
                  Page {currentPage}
                </span>

                <button
                  onClick={handleNext}
                  className="bg-gray-600 text-white px-3 py-2 rounded-md text-sm w-auto hover:bg-gray-700 transition duration-150"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
