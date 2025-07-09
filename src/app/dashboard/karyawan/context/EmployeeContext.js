'use client';
import { createContext, useState, useContext } from "react";

// Buat Context untuk Employee
export const EmployeeContext = createContext();

// Buat Provider untuk membungkus aplikasi
export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([
    {
      no: 1,
      name: "gojo saturu",
      email: "satorugojo@gmail.com",
      division: "sales",
      position: "Staf",
      status: "Aktif",
    },
    {
      no: 2,
      name: "Muhammad iqbal",
      email: "iqbalsodroon@gmail.com",
      division: "IT",
      position: "Supervisor",
      status: "Aktif",
    },
    {
      no: 3,
      name: "Armida",
      email: "armida@gmail.com",
      division: "sales",
      position: "staff",
      status: "Aktif",
    },
  ]);

  // Fungsi untuk menambahkan employee baru
  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      { ...newEmployee, no: prevEmployees.length + 1 },
    ]);
  };

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

// Hook untuk akses data karyawan di komponen lain
export const useEmployees = () => useContext(EmployeeContext);
