import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FullEvents = () => {
  const [events, setEvents] = useState([]);

useEffect(() => {
    // wait for page to paint
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }, []);
  
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 pt-24 pb-24">
        <h1 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Events & Projects
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-gray-900/50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <img
                src={`http://localhost:5000/uploads/${event.image}`}
                alt={event.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl text-purple-300 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default FullEvents;
