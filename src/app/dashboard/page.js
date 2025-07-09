"use client";

import React, { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header"; // Import Header

import {
  FaEnvelope,
  FaSpinner,
  FaCheckCircle,
  FaUsers,
  FaArrowRight,
  FaBars,
} from "react-icons/fa";

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState("Dashboard");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State untuk menampilkan/menyembunyikan sidebar
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // Toggle state sidebar
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

      {/* Konten Utama */}
      <div className="flex-1 min-h-screen flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-800 flex justify-between items-center p-4">
          {/* Hamburger untuk tampilan mobile */}
          <button className="lg:hidden text-white" onClick={toggleMobileMenu}>
            <FaBars />
          </button>
          <Header title={activeContent} />
        </div>

        {/* Konten */}
        <div className="p-8 flex-1">
          <h2 className="text-4xl font-bold text-white">{activeContent}</h2>
          <p className="text-lg text-gray-400 mt-2">
            Selamat datang di Helpdesk System
          </p>

          {/* Kolom Informasi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10">
            {/* Kolom 1 */}
            <div className="p-6 bg-blue-500 rounded-lg text-white shadow-md flex flex-col items-center justify-between min-h-[150px]">
              <div className="flex flex-col items-center">
                <FaEnvelope className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-center">
                  1 Tiket Menunggu Respon
                </h3>
              </div>
              <div className="mt-4 flex justify-between items-center border-t border-blue-700 pt-2 w-full">
                <p className="text-sm">More Info</p>
                <FaArrowRight />
              </div>
            </div>

            {/* Kolom 2 */}
            <div className="p-6 bg-yellow-500 rounded-lg text-white shadow-md flex flex-col items-center justify-between">
              <div className="flex flex-col items-center">
                <FaSpinner className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-center">
                  0 Tiket Proses Pengerjaan
                </h3>
              </div>
              <div className="mt-4 flex justify-between items-center border-t border-yellow-700 pt-2 w-full">
                <p className="text-sm">More Info</p>
                <FaArrowRight />
              </div>
            </div>

            {/* Kolom 3 */}
            <div className="p-6 bg-green-500 rounded-lg text-white shadow-md flex flex-col items-center justify-between">
              <div className="flex flex-col items-center">
                <FaCheckCircle className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-center">
                  1 Tiket Sukses
                </h3>
              </div>
              <div className="mt-4 flex justify-between items-center border-t border-green-700 pt-2 w-full">
                <p className="text-sm">More Info</p>
                <FaArrowRight />
              </div>
            </div>

            {/* Kolom 4 */}
            <div className="p-6 bg-purple-500 rounded-lg text-white shadow-md flex flex-col items-center justify-between">
              <div className="flex flex-col items-center">
                <FaUsers className="w-12 h-12 mb-2" />
                <h3 className="text-lg font-bold text-center">3 Karyawan</h3>
              </div>
              <div className="mt-4 flex justify-between items-center border-t border-purple-700 pt-2 w-full">
                <p className="text-sm">More Info</p>
                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
