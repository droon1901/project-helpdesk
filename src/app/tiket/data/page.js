"use client";

import React, { useState } from "react";
import Sidebar from "../../dashboard/sidebar";
import Header from "../../dashboard/header"; // Import Header
import { FaEye, FaBars, FaTimes } from "react-icons/fa";
import ModalTambahTiket from "../../component/ModalTambahTiket";

const DataTiket = () => {
  const [activeContent, setActiveContent] = useState("Data Tiket");
  const [isTambahTiketOpen, setIsTambahTiketOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [entries, setEntries] = useState(10); // Default entries per page
  const [search, setSearch] = useState("");
  const [tiketData, setTiketData] = useState([
    {
      no: 1,
      noTiket: "TKT123",
      keluhan: "Koneksi Lambat",
      status: "Waiting...",
      konfirmasi: "Confirm",
    },
    {
      no: 2,
      noTiket: "TKT124",
      keluhan: "Error Sistem",
      status: "Solved",
      konfirmasi: "Ticket Closed",
    },
    {
      no: 3,
      noTiket: "TKT125",
      keluhan: "Lupa Password",
      status: "Solved",
      konfirmasi: "Ticket Closed",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({
    keluhan: "",
    deskripsi: "",
    tanggapan: "",
    file: null,
  });

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleConfirm = (noTiket) => {
    const isConfirmed = window.confirm(`Yakin confirm tiket ini?`);
    if (isConfirmed) {
      const updatedTiketData = tiketData.map((tiket) =>
        tiket.noTiket === noTiket
          ? { ...tiket, status: "Response...", konfirmasi: "Reply Message" }
          : tiket
      );
      setTiketData(updatedTiketData);
      alert(`Tiket ${noTiket} berhasil dikonfirmasi!`);
    }
  };

  const handleReplyMessage = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleClose = (ticket) => {
    if (ticket.status !== "Solved") {
      const updatedTiketData = tiketData.map((tiket) =>
        tiket.noTiket === ticket.noTiket
          ? { ...tiket, status: "Solved", konfirmasi: "Ticket Closed" }
          : tiket
      );
      setTiketData(updatedTiketData);
      setIsModalOpen(false);
      alert(`Tiket ${ticket.noTiket} berhasil ditutup!`);
    } else {
      alert("Tiket ini sudah ditutup!");
    }
  };
  

  const handleReplySubmit = () => {
    const updatedTiketData = tiketData.map((tiket) =>
      tiket.noTiket === selectedTicket.noTiket
        ? { ...tiket, status: "Process...", konfirmasi: "Close" }
        : tiket
    );
    setTiketData(updatedTiketData);
    setIsModalOpen(false);
    alert(`Tiket ${selectedTicket.noTiket} berhasil diproses!`);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Tambahkan fungsi handleDeleteTicket
  const handleDeleteTicket = (noTiket) => {
    const isConfirmed = window.confirm(`Yakin hapus tiket ${noTiket}?`);
    if (isConfirmed) {
      const updatedTiketData = tiketData.filter(
        (tiket) => tiket.noTiket !== noTiket
      );
      setTiketData(updatedTiketData);
      alert(`Tiket ${noTiket} berhasil dihapus!`);
    }
  };

  const handleTambahTiket = (newTiket) => {
    // Tambahkan data default jika properti belum diisi
    const tiketLengkap = {
      ...newTiket,
      status: newTiket.status || "Waiting...",
      konfirmasi: newTiket.konfirmasi || "Confirm",
    };

    // Update state tiketData
    setTiketData((prevData) => [
      ...prevData,
      { id: prevData.length + 1, ...tiketLengkap },
    ]);
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
          <button className="lg:hidden text-white" onClick={toggleMobileMenu}>
            <FaBars />
          </button>
          <Header title={activeContent} />
        </div>

        {/* Konten */}
        <div className="p-8 flex-1">
          <div className="container mx-auto bg-gray-700 p-6 rounded-lg shadow-lg">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Data Tiket</h2>
              <button
                onClick={() => setIsTambahTiketOpen(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                + Tiket Baru
              </button>
            </div>

            {/* Show Entries and Form Pencarian */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-white">Filter</div>
                <select
                  value={entries}
                  onChange={(e) => setEntries(parseInt(e.target.value))}
                  className="bg-gray-900 text-white rounded py-2 px-4"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>

              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Cari tiket..."
                className="p-2 bg-white text-gray-600"
              />
            </div>

            {/* Tabel Data Tiket */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-white text-center">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="px-4 py-2">No</th>
                    <th className="px-4 py-2">No Tiket</th>
                    <th className="px-4 py-2">Keluhan</th>
                    <th className="px-4 py-2">Status Tiket</th>
                    <th className="px-4 py-2">Konfirmasi</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tiketData.slice(0, entries).map((tiket) => (
                    <tr key={tiket.no} className="border-t border-gray-400">
                      <td className="px-4 py-2">{tiket.no}</td>
                      <td className="px-4 py-2">{tiket.noTiket}</td>
                      <td className="px-4 py-2">{tiket.keluhan}</td>
                      <td className="px-4 py-2">
                        <button
                          className={`inline-flex items-center px-4 py-1 text-sm border ${
                            tiket.status === "Response"
                              ? "px-1 py-0 bg-blue-500 text-white border-blue-500"
                              : tiket.status === "Waiting..."
                              ? "px-1 py-0 bg-yellow-500 text-black border-yellow-500"
                              : tiket.status === "Solved"
                              ? "px-1 py-0 bg-red-500 text-white border-red-500"
                              : "px-1 py-0 bg-blue-500 text-white border-blue-500"
                          }`}
                        >
                          {tiket.status}
                        </button>
                      </td>
                      <td className="px-4 py-2">
                        {/* Status Reply Message */}
                        {tiket.konfirmasi === "Reply Message" ? (
                          <button
                            onClick={() => handleReplyMessage(tiket)}
                            className="px-1 py-0 text-sm border bg-yellow-500 text-black border-yellow-500 hover:bg-yellow-600"
                          >
                            {tiket.konfirmasi}
                          </button>
                        ) : tiket.konfirmasi === "Close" ? (
                          // Tombol "Close" (Hijau)
                          <button
                            onClick={() => handleClose(tiket)}
                            className="px-1 py-0 text-sm border bg-blue-700 text-white border-blue-700 hover:bg-blue-800"
                          >
                            {tiket.konfirmasi}
                          </button>
                        ) : tiket.konfirmasi === "Ticket Closed" ? (
                          // Tombol "Ticket Closed" (Merah)
                          <button
                            className="px-1 py-0 text-sm border bg-red-500 text-white border-red-500 cursor-not-allowed"
                            disabled
                          >
                            {tiket.konfirmasi}
                          </button>
                        ) : (
                          // Default tombol konfirmasi lainnya
                          <button
                            onClick={() => handleConfirm(tiket.noTiket)}
                            className="px-1 py-0 text-sm border bg-green-500 text-white border-green-500 hover:bg-green-600"
                          >
                            {tiket.konfirmasi}
                          </button>
                        )}
                      </td>

                      <td className="px-4 py-2 flex gap-4 justify-center">
                        <button className="text-blue-500 hover:text-blue-700">
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDeleteTicket(tiket.noTiket)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTimes />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between mt-6">
              <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                Previous
              </button>
              <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Reply Message */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-gray-700 p-6 rounded-lg w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Tanggapan IT Support
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm">Keluhan</label>
                <textarea
                  className="w-full p-2 border rounded text-gray-700 h-9"
                  value={formData.keluhan}
                  onChange={(e) =>
                    setFormData({ ...formData, keluhan: e.target.value })
                  }
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm">Deskripsi</label>
                <textarea
                  className="w-full p-2 border rounded text-gray-700 h-9"
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm">Tanggapan</label>
                <textarea
                  className="w-full p-2 border rounded text-gray-700 h-9"
                  value={formData.tanggapan}
                  onChange={(e) =>
                    setFormData({ ...formData, tanggapan: e.target.value })
                  }
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm">Gambar dan Tanggapan</label>
                <input
                  type="file"
                  className="w-full p-0 text-gray-700"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleReplySubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Send
                </button>
                <button
                  onClick={() => setIsModalOpen(false)} // Menutup modal tanpa mengubah status tiket
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ModalTambahTiket
        isOpen={isTambahTiketOpen}
        onClose={() => setIsTambahTiketOpen(false)}
        onSubmit={handleTambahTiket}
      />
    </div>
  );
};

export default DataTiket;
