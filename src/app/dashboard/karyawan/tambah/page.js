'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '../../sidebar';
import Header from '../../header';
import { FaArrowLeft, FaBars } from 'react-icons/fa';
import { useEmployees } from '../../karyawan/context/EmployeeContext';

const TambahKaryawan = () => {
  const [activeContent, setActiveContent] = useState('Tambah Karyawan');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);  // State untuk toggle menu mobile
  
  const router = useRouter();
  const { addEmployee, updateEmployee, getEmployeeById } = useEmployees();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get('id'); // Ambil ID dari query parameter

  const [formData, setFormData] = useState({
    nik: '',
    name: '',
    position: '',
    division: '',
    level: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleBack = () => {
    router.push('/dashboard/karyawan');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      nik: '',
      name: '',
      position: '',
      division: '',
      level: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  useEffect(() => {
    if (employeeId) {
      const employee = getEmployeeById(employeeId);
      if (employee) {
        setFormData({
          nik: employee.nik,
          name: employee.name,
          position: employee.position,
          division: employee.division,
          level: employee.level,
          email: employee.email,
          password: '',
          confirmPassword: '',
        });
        setActiveContent(`Edit Karyawan ${employee.name}`);
      }
    }
  }, [employeeId, getEmployeeById]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (employeeId) {
      updateEmployee(employeeId, formData);
    } else {
      addEmployee({
        nik: formData.nik,
        name: formData.name,
        position: formData.position,
        division: formData.division,
        level: formData.level,
        email: formData.email,
        status: "Aktif",  // Status default
      });
    }
  
    handleReset();
    router.push('/dashboard/karyawan');  // Kembali ke halaman data karyawan
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);  // Toggle status sidebar pada mobile
  };

  return (
    <div className="flex h-screen bg-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div className={`lg:flex ${isMobileMenuOpen ? 'block' : 'hidden'} w-56 bg-[#001f3f] text-white flex-col transition-all duration-300 ease-in-out`}>
        <Sidebar onMenuSelect={setActiveContent} />
      </div>

      {/* Konten Utama */}
      <div className="flex-1 min-h-screen flex flex-col overflow-y-auto">
        <div className="sticky top-0 z-10 bg-gray-800 flex justify-between items-center p-4">
          {/* Hamburger untuk tampilan mobile */}
          <button
            className="lg:hidden text-white"
            onClick={toggleMobileMenu}
          >
            <FaBars />
          </button>
          
          <Header title={activeContent} />
        </div>

        <div className="p-8 flex-1">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6 flex-col sm:flex-row">
  <h2 className="text-3xl font-bold text-white">{employeeId ? `Edit Karyawan ${formData.name}` : 'Tambah Karyawan'}</h2>

  {/* Tombol Back */}
  <div className="flex items-center space-x-4 mt-4 sm:mt-0 sm:ml-auto flex-shrink-0">
    <button onClick={handleBack} className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center">
      <FaArrowLeft className="mr-2" /> Back
    </button>
  </div>
</div>


            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Form Kiri */}
                <div>
                  <label htmlFor="nik" className="block text-white">Nomor NIK</label>
                  <input
                    type="text"
                    id="nik"
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
                    required
                  />

                  <label htmlFor="name" className="block text-white mt-4">Nama Karyawan</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
                    required
                  />

                  <label htmlFor="position" className="block text-white mt-4">Jabatan</label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
                    required
                  >
                    <option value="">--Silahkan Pilih--</option>
                    <option value="Staf">Staf</option>
                    <option value="Manager">Manager</option>
                    <option value="Supervisor">Supervisor</option>
                  </select>

                  <label htmlFor="division" className="block text-white mt-4">Divisi</label>
                  <select
                    id="division"
                    name="division"
                    value={formData.division}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
                    required
                  >
                    <option value="">--Silahkan Pilih--</option>
                    <option value="IT">IT</option>
                    <option value="HRD">HRD</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>

                {/* Form Kanan */}
                <div>
                  <label htmlFor="level" className="block text-white">Level User</label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
                    required
                  >
                    <option value="">--Silahkan Pilih--</option>
                    <option value="Staff">Staff</option>
                    <option value="IT">IT</option>
                  </select>

                  <label htmlFor="email" className="block text-white mt-4">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
                    required
                  />

                  <label htmlFor="password" className="block text-white mt-4">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
                    required
                  />

                  <label htmlFor="confirmPassword" className="block text-white mt-4">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0">
  <button
    type="button"
    onClick={handleReset}
    className="bg-gray-500 text-white py-2 px-4 rounded-lg w-full sm:w-auto"
  >
    Reset
  </button>

  <button
    type="submit"
    className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full sm:w-auto"
  >
    {employeeId ? 'Simpan' : 'Tambah'}
  </button>
</div>


            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahKaryawan;
