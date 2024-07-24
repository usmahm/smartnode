"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/contexts/UserContext";
import { NodeProvider } from "@/contexts/NodeContext";
import { AdminContextProvider } from "@/contexts/AdminContext";

const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <UserProvider>
        <NodeProvider>
          <AdminContextProvider>{children}</AdminContextProvider>
        </NodeProvider>
      </UserProvider>
      <ToastContainer />
    </>
  );
};

export default App;
