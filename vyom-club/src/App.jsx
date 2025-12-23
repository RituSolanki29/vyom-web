import { BrowserRouter, Routes, Route } from "react-router-dom";
import VyomClubWebsite from "./VyomClubWebsite";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import FullGallery from "./pages/FullGallery";
import FullBlogs from "./pages/FullBlogs";
import FullEvents from "./pages/FullEvents";

import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      {/* ✅ FORCE SCROLL TO TOP ON EVERY ROUTE CHANGE */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<VyomClubWebsite />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/gallery" element={<FullGallery />} />
        <Route path="/blogs" element={<FullBlogs />} />
        <Route path="/events" element={<FullEvents />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
