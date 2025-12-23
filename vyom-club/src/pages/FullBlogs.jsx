import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PREVIEW_LENGTH = 300;

const FullBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    // wait for page to paint
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then(res => res.json())
      .then(setBlogs);
  }, []);

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 pt-24 pb-24">
        <h1 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          All Blogs
        </h1>

        <div className="max-w-4xl mx-auto space-y-8">
          {blogs.map((blog) => {
            const isExpanded = expanded[blog._id];
            const isLong = blog.content.length > PREVIEW_LENGTH;

            return (
              <div
                key={blog._id}
                className="bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <h2 className="text-2xl text-purple-300 mb-2">
                  {blog.title}
                </h2>

                <p className="text-sm text-gray-400 mb-4">
                  By {blog.author}
                </p>

                <p
                  className={`text-gray-300 whitespace-pre-line leading-relaxed cursor-pointer ${
                    isLong ? "hover:text-purple-300 transition" : ""
                  }`}
                  onClick={() => isLong && toggleReadMore(blog._id)}
                >
                  {isExpanded || !isLong ? (
                    <>
                      {blog.content}
                      {isLong && (
                        <span className="text-purple-400 font-medium ml-2">
                          Read less
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      {blog.content.slice(0, PREVIEW_LENGTH)}...
                      <span className="text-purple-400 font-medium ml-2">
                        Read more
                      </span>
                    </>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FullBlogs;
