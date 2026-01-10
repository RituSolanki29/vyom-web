import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_URL } from "../config/api";


const FullGallery = () => {
  const [images, setImages] = useState([]);

  // ✅ FORCE SCROLL TO TOP (robust)
  useEffect(() => {
    // wait for page to paint
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/gallery`)
      .then((res) => res.json())
      .then(setImages);
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Gallery
          </h1>

          {/* Masonry layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((img) => (
              <img
                key={img._id}
                src={img.image}
                alt={img.caption}
                className="w-full rounded-xl object-cover shadow-lg hover:shadow-xl transition break-inside-avoid"
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FullGallery;
