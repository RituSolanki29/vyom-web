import React, { useEffect, useState } from "react";
import { API_URL } from "./config/api";



const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blogs`);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch blogs");
    }
  };

  const deleteBlog = async (id) => {
    const token = localStorage.getItem("adminToken");

    try {
      await fetch(`${API_URL}/api/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      setBlogs(blogs.filter((b) => b._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const PREVIEW_LENGTH = 200;

  return (
    <>
      {/* PAGE CONTENT */}
      <div className="min-h-screen text-white px-4 pb-24">
        <h1 className="text-3xl font-bold text-purple-400 mb-8">
          Manage Blogs
        </h1>

        {blogs.map((blog) => {
          const isExpanded = expanded[blog._id];
          const isLong = blog.content.length > PREVIEW_LENGTH;

          return (
            <div
              key={blog._id}
              className="bg-gray-800 border border-purple-500/30 rounded-xl p-6 mb-6"
            >
              <h2 className="text-xl text-purple-300 font-semibold mb-1">
                {blog.title}
              </h2>

              <p className="text-sm text-gray-400 mb-3">
                By {blog.author}
              </p>

              {/* Read More / Read Less */}
              <p
                onClick={() => isLong && toggleReadMore(blog._id)}
                className={`text-gray-300 mb-4 whitespace-pre-line ${
                  isLong ? "cursor-pointer" : ""
                }`}
              >
                {isExpanded || !isLong ? (
                  <>
                    {blog.content}
                    {isLong && (
                      <span className="text-purple-400 ml-1 font-medium">
                        {" "}Read less
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    {blog.content.slice(0, PREVIEW_LENGTH)}...
                    <span className="text-purple-400 ml-1 font-medium">
                      Read more
                    </span>
                  </>
                )}
              </p>

              <button
                onClick={() => deleteBlog(blog._id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
     
    </>
  );
};

export default AdminBlogs;
