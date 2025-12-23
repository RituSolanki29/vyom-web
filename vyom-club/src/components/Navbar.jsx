import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = Boolean(localStorage.getItem("adminToken"));

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "gallery", label: "Gallery" },
    { id: "projects", label: "Projects" },
    { id: "blogs", label: "Blogs" },
    { id: "about", label: "About" },
    { id: "register", label: "Join" },
    { id: "contact", label: "Contact" }
  ];

  const handleAdminLogin = () => {
    window.location.href = "/admin";
  };

  const scrollToSection = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="relative px-3 py-2 text-sm font-medium transition-all duration-300 group hover:text-purple-400"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300 origin-left" />
              </button>
            ))}

            <button
              onClick={handleAdminLogin}
              className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-purple-400/50"
            >
              {isAdmin ? "Admin" : "Admin Login"}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={handleAdminLogin}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-lg"
            >
              {isAdmin ? "Admin" : "Admin"}
            </button>

            <button
              className="text-white p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-purple-500/20 backdrop-blur-xl">
          <div className="px-4 py-6 space-y-4">
            <button
              onClick={handleAdminLogin}
              className="w-full py-3 px-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl"
            >
              {isAdmin ? "Admin Panel" : "Admin Login"}
            </button>

            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="block w-full text-left py-3 px-4 text-lg font-medium rounded-xl hover:bg-purple-500/20 hover:text-purple-400 border-l-4 border-transparent hover:border-purple-400"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
