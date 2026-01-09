import React, { useEffect, useState } from "react";
import { Calendar, Users } from "lucide-react";
import { API_URL } from "./config/api";



const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    contributors: ""
  });
  const [image, setImage] = useState(null);

  /* ================= FETCH EVENTS ================= */
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch(`${API_URL}/api/events`);
    const data = await res.json();
    setEvents(data);
  };

  /* ================= ADD EVENT ================= */
  const addEvent = async () => {
    if (!image || !form.title || !form.description) {
      alert("All fields required");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) =>
      formData.append(key, form[key])
    );
    formData.append("image", image);

    await fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("adminToken")
      },
      body: formData
    });

    setForm({ title: "", description: "", date: "", contributors: "" });
    setImage(null);
    fetchEvents();
  };

  /* ================= DELETE EVENT ================= */
  const deleteEvent = async (id) => {
    await fetch(`${API_URL}/api/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("adminToken")
      }
    });
    fetchEvents();
  };

  return (
    <>
      {/* ================= ADD EVENT FORM ================= */}
      <div className="mb-14 bg-gray-900/50 border border-purple-500/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-purple-300 mb-6">
          Add Event / Project
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Title"
            className="p-3 bg-gray-800 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Contributors"
            className="p-3 bg-gray-800 rounded"
            value={form.contributors}
            onChange={(e) =>
              setForm({ ...form, contributors: e.target.value })
            }
          />
          <input
            type="date"
            className="p-3 bg-gray-800 rounded"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2 bg-gray-800 rounded"
          />
        </div>

        <textarea
          placeholder="Description"
          className="w-full p-3 bg-gray-800 rounded mt-4"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button
          onClick={addEvent}
          className="mt-6 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold"
        >
          Add Event
        </button>
      </div>

      {/* ================= EVENTS GRID (SAME AS MAIN WEBSITE) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event._id}
            className="relative bg-gray-900/50 border border-purple-500/30 
                       rounded-xl overflow-hidden hover:border-purple-400 
                       hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {/* Image */}
            <img
              src={`${API_URL}/uploads/${event.image}`}
              alt={event.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-purple-300 mb-2">
                {event.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              <div className="flex justify-between text-sm text-gray-500">
                <span className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {event.date}
                </span>
                <span className="flex items-center">
                  <Users size={16} className="mr-2" />
                  {event.contributors}
                </span>
              </div>
            </div>

            {/* ADMIN DELETE */}
            <button
              onClick={() => deleteEvent(event._id)}
              className="absolute top-3 right-3 bg-red-600 
                         hover:bg-red-700 text-xs px-3 py-1 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminEvents;
