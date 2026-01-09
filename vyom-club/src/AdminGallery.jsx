import React, { useEffect, useState } from "react";
import { API_URL } from "./config/api";



const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const res = await fetch(`${API_URL}/api/gallery`);
    const data = await res.json();
    setImages(data);
  };

  const addImage = async () => {
    if (!file || !caption) return alert("All fields required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    await fetch(`${API_URL}/api/gallery`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("adminToken")
      },
      body: formData
    });

    setCaption("");
    setFile(null);
    fetchGallery();
  };

  const deleteImage = async (id) => {
    await fetch(`${API_URL}/api/gallery/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("adminToken")
      }
    });
    fetchGallery();
  };

  return (
    <>
      {/* ================= ADD IMAGE ================= */}
      <div
        className="
          mb-14
          w-full
          sm:max-w-xl sm:mx-auto
          lg:max-w-none lg:mx-0
          bg-gray-900/50
          border border-purple-500/30
          rounded-2xl
          p-5 sm:p-8
        "
      >
        <h2 className="text-2xl font-bold text-purple-300 mb-6">
          Add Gallery Image
        </h2>

        {/* FILE UPLOAD (CUSTOM – NO NATIVE INPUT UI) */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-purple-300 mb-2">
            Gallery Image
          </label>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Hidden native input */}
            <input
              type="file"
              id="galleryImage"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />

            {/* Custom button */}
            <label
              htmlFor="galleryImage"
              className="cursor-pointer px-4 py-2 bg-gray-800 rounded-lg
                         border border-purple-500/30 hover:bg-gray-700
                         transition text-sm font-medium"
            >
              Choose Image
            </label>

            {/* File name */}
            <span className="text-sm text-gray-400 break-all max-w-full">
              {file ? file.name : "No file chosen"}
            </span>
          </div>
        </div>

        {/* CAPTION */}
        <input
          placeholder="Caption"
          className="w-full mb-5 p-3 bg-gray-800 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        {/* SUBMIT */}
        <button
          onClick={addImage}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2
                     rounded-lg font-semibold transition"
        >
          Add Image
        </button>
      </div>

      {/* ================= GALLERY GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((img) => (
          <div
            key={img._id}
            className="relative group overflow-hidden rounded-xl
                       hover:scale-105 transition-transform duration-300
                       border border-purple-500/30 shadow-lg"
          >
            <img
              src={`${API_URL}/uploads/${img.image}`}
              alt={img.caption}
              className="w-full h-64 object-cover"
            />

            {/* Caption overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t
                         from-black/80 to-transparent opacity-0
                         group-hover:opacity-100 transition
                         flex items-end p-4"
            >
              <p className="text-white font-semibold">
                {img.caption}
              </p>
            </div>

            {/* Delete button */}
            <button
              onClick={() => deleteImage(img._id)}
              className="absolute top-3 right-3 bg-red-600
                         hover:bg-red-700 px-3 py-1
                         rounded text-xs"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminGallery;
