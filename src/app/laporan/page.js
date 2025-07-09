"use client";

import React, { useState } from "react";
import Sidebar from "../dashboard/sidebar";
import Header from "../dashboard/header"; 

const Laporan = () => {
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");

  // Fungsi untuk handle input tanggal
  const handlePrintReport = () => {
    // Logic untuk cetak laporan berdasarkan tanggalAwal dan tanggalAkhir
    console.log("Mencetak laporan dari", tanggalAwal, "ke", tanggalAkhir);
  };

  return (
    <div className="flex h-screen bg-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div className="lg:flex w-56 bg-[#001f3f] text-white flex-col">
        <Sidebar />
      </div>

      {/* Konten Utama */}
      <div className="flex-1 min-h-screen flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-800 flex justify-between items-center p-4">
          <Header title="Laporan" />
        </div>

        {/* Konten */}
        <div className="flex justify-center items-center p-8 flex-1">
          {/* Container */}
          <div className="w-full max-w-2xl bg-gray-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold text-white text-center">Cetak Laporan Periode</h2>
            <p className="text-lg text-gray-400 mt-2 text-center">Pilih periode untuk mencetak laporan</p>

            {/* Form Tanggal */}
            <div className="mt-10">
              <div className="mb-6">
                <label htmlFor="tanggalAwal" className="text-white text-sm font-medium">Tanggal Awal</label>
                <input
                  type="date"
                  id="tanggalAwal"
                  className="mt-2 p-2 w-full bg-gray-600 text-white rounded-md"
                  value={tanggalAwal}
                  onChange={(e) => setTanggalAwal(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="tanggalAkhir" className="text-white text-sm font-medium">Tanggal Akhir</label>
                <input
                  type="date"
                  id="tanggalAkhir"
                  className="mt-2 p-2 w-full bg-gray-600 text-white rounded-md"
                  value={tanggalAkhir}
                  onChange={(e) => setTanggalAkhir(e.target.value)}
                />
              </div>

              <button
  onClick={handlePrintReport}
  disabled={!tanggalAwal || !tanggalAkhir}
  className={`w-auto py-2 px-6 mt-4 text-white font-bold rounded-md ${!tanggalAwal || !tanggalAkhir ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'} transition-colors`}
>
  Print Laporan
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laporan;
