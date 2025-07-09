import React, { useState } from "react";
import {
  FaUsers,
  FaTicketAlt,
  FaList,
  FaUser,
  FaCog,
  FaChartBar,
  FaCircle,
} from "react-icons/fa";
import Link from "next/link";
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
  const { openMenus, toggleMenu } = useSidebar();

  const [image, setImage] = useState(
    localStorage.getItem("profileImage") || "/default-photo.jpg"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setImage(base64Image);
        localStorage.setItem("profileImage", base64Image); 
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="fixed top-0 left-0 h-screen w-56 bg-[#001f3f] text-white flex flex-col">
      {/* Logo */}
      <div className="p-4 text-center text-4xl font-semibold italic border-b border-gray-700 mb-4">
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Helpdesk System
        </span>
      </div>

      {/* Profile Section */}
      <div className="flex items-center justify-center p-3 border-b border-gray-700">
        {/* Profile Picture Frame */}
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-500 relative -top-[4px]">
          <img
            src={image}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            title="Change Profile Picture"
          />
        </div>
        {/* Profile Name */}
        <div className="ml-3 text-sm font-medium text-gray-200 relative -top-[4px]">
          Muhammad iqbal
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto pb-20">
        <nav className="flex flex-col">
          <ul>
            {/* Dashboard Menu */}
            <li
              className={`flex items-center p-4 transition-all duration-300 ease-in-out transform ${
                openMenus.dashboard ? "bg-blue-600" : "hover:bg-gray-700"
              } cursor-pointer focus:outline-none`}
              onClick={() => toggleMenu("dashboard")}
            >
              <FaUsers
                className={`mr-3 transition-transform duration-300 ${
                  openMenus.dashboard ? "rotate-180" : "rotate-0"
                }`}
                size={20}
              />
              <Link href="/dashboard">
                <span className="text-base">Dashboard</span>
              </Link>
            </li>
            {openMenus.dashboard && (
              <ul className="pl-8">
                <li className="flex items-center p-4 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none">
                  <FaCircle
                    className={`mr-3 transition-transform duration-300 ${
                      openMenus.ticket ? "rotate-180" : "rotate-0"
                    }`}
                    size={8}
                  />
                  <Link href="/dashboard/overview">
                    {" "}
                    {/* Link ke halaman Overview */}
                    <span className="text-base">Data Departemen</span>
                  </Link>
                </li>
                <li className="flex items-center p-4 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none">
                  <FaCircle
                    className={`mr-3 transition-transform duration-300 ${
                      openMenus.ticket ? "rotate-180" : "rotate-0"
                    }`}
                    size={8}
                  />
                  <Link href="/dashboard/karyawan">
                    {" "}
                    {/* Link ke halaman Statistik Tiket */}
                    <span className="text-base">Data Karyawan</span>
                  </Link>
                </li>
              </ul>
            )}

            {/* Tiket Menu */}
            <li
              className={`flex items-center p-4 transition-all duration-300 ease-in-out transform ${
                openMenus.ticket ? "bg-blue-600" : "hover:bg-gray-700"
              } cursor-pointer focus:outline-none`}
              onClick={() => toggleMenu("ticket")}
            >
              <FaTicketAlt
                className={`mr-3 transition-transform duration-300 ${
                  openMenus.ticket ? "rotate-180" : "rotate-0"
                }`}
                size={20}
              />

              <span className="text-base">Master Ticket</span>
            </li>
            {openMenus.ticket && (
              <ul className="pl-8">
                <li className="flex items-center p-4 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none">
                  <FaCircle
                    className={`mr-3 transition-transform duration-300 ${
                      openMenus.ticket ? "rotate-180" : "rotate-0"
                    }`}
                    size={8}
                  />
                  <Link href="/tiket/data">
                    <span className="text-base">Data Tiket</span>
                  </Link>
                </li>
              </ul>
            )}

            {/* Daftar Tiket Menu */}
            <li
              className={`flex items-center p-4 transition-all duration-300 ease-in-out transform ${
                openMenus.daftarTiket ? "bg-blue-600" : "hover:bg-gray-700"
              } cursor-pointer focus:outline-none`}
              onClick={() => toggleMenu("daftarTiket")}
            >
              <FaList
                className={`mr-3 transition-transform duration-300 ${
                  openMenus.daftarTiket ? "rotate-180" : "rotate-0"
                }`}
                size={20}
              />
              <span className="text-base">Daftar Tiket</span>
            </li>
            {openMenus.daftarTiket && (
              <ul className="pl-8">
                <li className="flex items-center p-4 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none">
                  <span className="text-base">Semua Tiket</span>
                </li>
                <li className="flex items-center p-4 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none">
                  <span className="text-base">Tiket Terbuka</span>
                </li>
                <li className="flex items-center p-4 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none">
                  <span className="text-base">Tiket Selesai</span>
                </li>
              </ul>
            )}

            {/* Profil Menu */}
            <li className="flex items-center p-4 transition-all duration-300 ease-in-out transform hover:bg-gray-700 cursor-pointer focus:outline-none">
              <FaUser className="mr-3" size={20} />
              <span className="text-base">Profil</span>
            </li>

            {/* Pengaturan Menu */}
            <li
              className={`flex items-center p-4 transition-all duration-300 ease-in-out transform ${
                openMenus.pengaturan ? "bg-blue-600" : "hover:bg-gray-700"
              } cursor-pointer focus:outline-none`}
              onClick={() => toggleMenu("pengaturan")}
            >
              <FaCog
                className={`mr-3 transition-transform duration-300 ${
                  openMenus.pengaturan ? "rotate-180" : "rotate-0"
                }`}
                size={20}
              />
              <span className="text-base">Pengaturan</span>
            </li>
            {openMenus.pengaturan && (
              <ul className="pl-8">
                <li className="flex items-center p-4 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none">
                  <span className="text-base">Pengguna</span>
                </li>
                <li className="flex items-center p-4 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none">
                  <span className="text-base">Keamanan</span>
                </li>
              </ul>
            )}

            {/* Laporan Menu */}
            <li
              className={`flex items-center p-4 transition-all duration-300 ease-in-out transform ${
                openMenus.laporan ? "bg-blue-600" : "hover:bg-gray-700"
              } cursor-pointer focus:outline-none`}
              onClick={() => toggleMenu("laporan")}
            >
              <FaChartBar
                className={`mr-3 transition-transform duration-300 ${
                  openMenus.laporan ? "rotate-180" : "rotate-0"
                }`}
                size={20}
              />
              <Link href="/laporan">
              <span className="text-base">Laporan</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
