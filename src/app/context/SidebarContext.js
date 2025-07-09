"use client";

import React, { createContext, useContext, useState } from "react";

//  context sidebar
const SidebarContext = createContext();

// Provider state Sidebar
export const SidebarProvider = ({ children }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuName) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuName]: !prevState[menuName],
    }));
  };

  return (
    <SidebarContext.Provider value={{ openMenus, toggleMenu }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook context
export const useSidebar = () => {
  return useContext(SidebarContext);
};
