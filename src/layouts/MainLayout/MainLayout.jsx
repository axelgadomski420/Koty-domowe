// src/layouts/MainLayout/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../../pages/shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Górny pasek */}
      <Navbar />

      {/* Główna treść stron */}
      <main className="max-w-5xl mx-auto px-4 pb-6 pt-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
