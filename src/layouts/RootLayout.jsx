import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f7f6f2] dark:bg-[#111614] transition-colors duration-200">
      <Navbar />

      <main className="flex-1 bg-[#f7f6f2] dark:bg-[#111614]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};