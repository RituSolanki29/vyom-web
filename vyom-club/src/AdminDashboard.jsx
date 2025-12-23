import React, { useState } from "react";
import AdminGallery from "./AdminGallery";
import AdminBlogs from "./AdminBlogs";
import AdminEvents from "./AdminEvents";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer";

const AdminDashboard = () => {
  const [tab, setTab] = useState("gallery");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-purple-900/20 to-black text-white">
      
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-xl z-50 border-b border-purple-500/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img
                src="/logo.jpg"
                alt="Vyom Club Logo"
                className="w-8 h-8 lg:w-10 lg:h-10 object-contain drop-shadow-lg"
              />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Vyom Club
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg text-sm font-semibold"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-grow pt-24 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="py-6 border-b border-purple-500/30 text-center sm:text-left px-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 py-6 justify-center sm:justify-start px-4">
          {["gallery", "blogs", "events"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                tab === item
                  ? "bg-purple-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-4 sm:px-8 pb-16">
          {tab === "gallery" && <AdminGallery />}
          {tab === "blogs" && <AdminBlogs />}
          {tab === "events" && <AdminEvents />}
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
