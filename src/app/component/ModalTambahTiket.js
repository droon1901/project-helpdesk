"use client";

import React, { useState } from "react";

const ModalTambahTiket = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    noTiket: "",
    keluhan: "",
    deskripsi: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.noTiket && formData.keluhan && formData.deskripsi) {
      onSubmit(formData); // Kirim data ke parent
      onClose(); // Tutup modal
    } else {
      alert("Mohon lengkapi semua field!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-gray-700 p-6 rounded-lg w-1/2">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          Tambah Tiket Baru
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white">No Tiket</label>
            <input
              type="text"
              name="noTiket"
              value={formData.noTiket}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm text-white">Keluhan</label>
            <textarea
              name="keluhan"
              value={formData.keluhan}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm text-white">Deskripsi</label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-gray-600"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Tambah
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTambahTiket;
