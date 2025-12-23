import React from "react";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <section
      id="contact"
      className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-900/80 to-black border-t border-purple-500/20"
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        {/* Contact Info */}
        <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 mb-12">
          <div className="flex items-center gap-4">
            <Mail className="text-purple-400" size={20} />
            <a
              href="mailto:vyomclub@university.edu"
              className="text-gray-300 hover:text-purple-400 transition"
            >
              vyomclub@university.edu
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-purple-400" size={20} />
            <a
              href="tel:+919876543210"
              className="text-gray-300 hover:text-purple-400 transition"
            >
              +91 8341717162
            </a>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="text-purple-400 mt-1" size={20} />
            <div className="text-gray-300">
              <div>Department of Physics</div>
              <div>Amrita Vishwa Vidyapeetham University</div>
              <div className="text-purple-400">Bengaluru, Karnataka, India</div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-8 pt-8 border-t border-purple-500/20">
          <a
            href="https://www.instagram.com/vyom.amrita?igsh=MXJ0bjRoMDR2dzQwZg=="
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-xl bg-gray-900/50 hover:bg-purple-500/20
                       border border-purple-500/30 hover:border-purple-400
                       transition-all duration-300 hover:scale-110"
          >
            <Instagram
              size={24}
              className="text-gray-400 group-hover:text-pink-400"
            />
          </a>
        </div>

        {/* Creator Credit */}
        <div className="mt-10 text-center text-sm text-gray-400">
          Designed & Developed by{" "}
          <span className="text-purple-400 font-semibold">
            Riya Solanki
          </span>
        </div>

      </div>
    </section>
  );
};

export default Footer;
