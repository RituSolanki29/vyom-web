# 🌌 Vyom Club Website

## 📖 Introduction

The **Vyom Club Website** is a full-stack web application developed to represent the **Vyom Club**, a student community focused on **astrophysics, cosmology, space science, and research activities**.

The platform acts as the official digital presence of the club, allowing visitors to explore:
- Club events and projects
- Photo gallery
- Blogs written by members
- Club mission, vision, and activities

It also includes an **Admin Panel** that allows authorized users to manage content dynamically.

---

## 🧩 Project Structure
###1️⃣ Backend (Express + MongoDB Atlas)
###2️⃣ Frontend (React + Nginx)

---

# 🎨 Frontend (Client)

## 📌 Tech Stack
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Lucide Icons
- Fetch API

---

## 📂 Frontend Folder Structure

---

## 🔹 Important Frontend Files

### `VyomClubWebsite.jsx`
- Main landing page
- Contains:
  - Home section
  - Gallery preview
  - Projects & Events preview
  - Blogs with Read More / Read Less
  - About section
  - Join section (QR code)
  - Contact & footer
- Handles API calls for gallery, blogs, and events
- Includes modal popups for images and events

---

### `Navbar.jsx`
- Fixed navigation bar
- Responsive (desktop & mobile)
- Smooth scrolling to sections
- Admin login button

---

### `Footer.jsx`
- Contact details
- Social media links (Instagram & LinkedIn)
- Creator credit

---

### `FullGallery.jsx`
- Displays all gallery images
- Masonry layout for different image sizes
- Includes Navbar and Footer
- Scrolls to top on page load

---

### `FullBlogs.jsx`
- Displays all blogs
- Read More / Read Less functionality
- Includes Navbar and Footer

---

### `FullEvents.jsx`
- Displays all events and projects
- Card-based grid layout
- Includes Navbar and Footer

---

### `AdminLogin.jsx`
- Admin authentication page
- Stores JWT token in localStorage

---

### `AdminDashboard.jsx`
- Protected admin panel
- Tabs:
  - Gallery management
  - Blog management
  - Event management
- Logout functionality

---

### `AdminRoute.jsx`
- Protects admin routes
- Prevents unauthorized access

---

### `App.jsx`
- Central routing file
- Defines all public and admin routes

---

# ⚙️ Backend (Server)

## 📌 Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer (Image uploads)

---

## 📂 Backend Folder Structure

---

## 🔹 Important Backend Files

### `server.js`
- Entry point of backend
- Starts the Express server
- Connects to MongoDB

---

### `app.js`
- Express configuration
- Middleware setup:
  - JSON parsing
  - CORS
  - Static file serving (`/uploads`)

---

### `models/`
- **Blog.js** – Blog title, author, content, timestamps
- **Event.js** – Event title, description, image, date
- **Gallery.js** – Image and caption
- **User.js** – Admin authentication data

---

### `routes/`
- **blogRoutes.js**
  - GET all blogs
  - POST blog (admin only)
  - DELETE blog (admin only)

- **eventRoutes.js**
  - GET all events
  - POST event (admin only)

- **galleryRoutes.js**
  - GET gallery images
  - POST image upload (admin only)

- **authRoutes.js**
  - Admin login
  - JWT token generation

---

### `middleware/authMiddleware.js`
- Verifies JWT token
- Protects admin-only routes

---



