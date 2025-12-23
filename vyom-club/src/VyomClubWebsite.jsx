import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu, X, Star, Calendar, Users,
  Mail, Phone, MapPin, Github, Linkedin, Instagram
} from "lucide-react";

import { API_URL } from "../config/api";

/* ===== ASSETS ===== */
import qrCode from "./assets/QR-code.jpg";
import mentorImg from "../assets/mentor.jpg";



/* ================= MAIN WEBSITE ================= */

function VyomClubWebsite() {
  const navigate = useNavigate();

  const [currentQuote, setCurrentQuote] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", content: "" });
  const [expandedBlogs, setExpandedBlogs] = useState({});
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const isAdmin = Boolean(localStorage.getItem("adminToken"));

  /* ================= DATA ================= */

  const quotes = [
    { text: "The cosmos is within us. We are made of star-stuff.", author: "Carl Sagan" },
    { text: "Look up at the stars and not down at your feet.", author: "Stephen Hawking" },
    { text: "The universe is under no obligation to make sense to you.", author: "Neil deGrasse Tyson" }
  ];

  const [projects, setProjects] = useState([]);

  const [galleryImages, setGalleryImages] = useState([]);


  /* ================= EFFECTS ================= */

  useEffect(() => {
    fetchGallery();
    fetchBlogs();
    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentQuote((prev) => (prev + 1) % quotes.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  /* ================= API ================= */

    const fetchBlogs = async () => {
        try {
            const res = await fetch(`${API_URL}/api/blogs`);
            const data = await res.json();
            setBlogPosts(data);
        } catch {
        console.error("Failed to fetch blogs");
        }
    };

    const fetchEvents = async () => {
        try {
            const res = await fetch(`${API_URL}/api/events`);
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error("Failed to fetch events");
        }
    };

    const toggleReadMore = (id) => {
        setExpandedBlogs((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const BLOG_PREVIEW_LENGTH = 220;




  const handleSubmitBlog = async () => {
    if (!newBlog.title || !newBlog.author || !newBlog.content) return;

    const res = await fetch(`${API_URL}/api/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlog)
    });

    const saved = await res.json();
    setBlogPosts([saved, ...blogPosts]);
    setNewBlog({ title: "", author: "", content: "" });
    setShowBlogForm(false);
  };


  const deleteBlog = async (id) => {
    await fetch(`${API_URL}/api/blogs/${id}`, {
      method: "DELETE",
      headers: { Authorization: localStorage.getItem("adminToken") }
    });
    setBlogPosts(blogPosts.filter(b => b._id !== id));
  };


  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const fetchGallery = async () => {
  try {
    const res = await fetch(`${API_URL}/api/gallery`);
    const data = await res.json();
    setGalleryImages(data);
  } catch (err) {
    console.error("Failed to fetch gallery");
  }
};


  /* ================= NAVBAR ================= */

  const Navbar = () => {
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
      window.location.href = '/admin';
    };

    return (
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-xl z-50 border-b border-purple-500/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              {/* Vyom Logo */}
                <img
                    src="/logo.jpg"
                    alt="Vyom Club Logo"
                    className="w-8 h-8 lg:w-10 lg:h-10 object-contain drop-shadow-lg"
                />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Vyom Club
              </span>
            </div>

            
            {/* Desktop Navigation + Admin Button */}
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

            {/* Admin Login Button - Desktop */}
            <button
              onClick={handleAdminLogin}
              className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-purple-400/50"
            >
              {isAdmin ? 'Admin' : 'Admin Login'}
            </button>
          </div>

             {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-2">
            {/* Admin Login Button - Mobile */}
            <button
              onClick={handleAdminLogin}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {isAdmin ? 'Admin' : 'Admin'}
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

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-purple-500/20 backdrop-blur-xl">
          <div className="px-4 py-6 space-y-4">
            {/* Admin Login Button - Mobile Menu */}
            <button
              onClick={handleAdminLogin}
              className="w-full py-3 px-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl transition-all hover:from-purple-700 hover:to-pink-700 border-l-4 border-transparent hover:border-purple-400 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isAdmin ? 'Admin Panel' : 'Admin Login'}
            </button>
            
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="block w-full text-left py-3 px-4 text-lg font-medium rounded-xl transition-all hover:bg-purple-500/20 hover:text-purple-400 border-l-4 border-transparent hover:border-purple-400"
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

  const Starfield = () => (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 3 + 2}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-black text-white">
      <Starfield />
      <Navbar />
      <div className="relative z-10 pt-16 sm:pt-20">
        
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/40" />
          <div className="text-center z-10 w-full max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse leading-tight">
              Vyom Club
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 mb-8 sm:mb-12 px-4 leading-relaxed">
              Exploring the Universe Beyond Limits
            </p>
            <div className="max-w-2xl mx-auto h-20 sm:h-24 flex items-center justify-center px-4">
              <div className="transition-opacity duration-1000 w-full">
                <p className="text-lg sm:text-xl md:text-2xl text-purple-300 italic leading-relaxed">
                  "{quotes[currentQuote].text}"
                </p>
                <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-2">
                  — {quotes[currentQuote].author}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-16 sm:py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 
                    bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Gallery
                </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleryImages.map((img) => (
                <div
                    key={img._id}
                    className="group relative overflow-hidden rounded-xl 
                        cursor-pointer transform hover:scale-105 
                        transition duration-300 shadow-xl"
                    onClick={() => setSelectedImage(img)}
                >
                    <img
                        src={`${API_URL}/uploads/${img.image}`}
                        alt={img.caption}
                        className="w-full h-64 object-cover"
                    />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent 
                            opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition flex items-end p-6">
                            <p className="text-white font-semibold">
                                {img.caption}
                            </p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="text-center mt-12">
                <button
                    onClick={() => navigate("/gallery")}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
                >
                    See More →
                </button>
            </div>

        </section>


        {/* Projects Section */}
        <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects & Events
            </h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-gray-900/50 border border-purple-500/30 rounded-lg sm:rounded-xl overflow-hidden hover:border-purple-500 transition-all duration-300 cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={() => setSelectedProject(project)}
                >
                    <img
                        src={`${API_URL}/uploads/${project.image}`}
                        alt={project.title}
                        className="w-full h-48 objlect-cover"
                    />


                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-300 mb-2 line-clamp-2">{project.title}</h3>
                    <p className="text-sm sm:text-base text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1 sm:mr-2" />
                        {project.date}
                      </span>
                      <span className="flex items-center">
                        <Users size={14} className="mr-1 sm:mr-2" />
                        {project.contributors}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
            <div className="text-center mt-12">
                <button
                    onClick={() => navigate("/events")}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
                >
                    See More →
                </button>
            </div>

        </section>

        {/* Blogs Section */}
        <section id="blogs" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4 sm:gap-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Blogs
              </h2>
              <button
                onClick={() => setShowBlogForm(!showBlogForm)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
              >
                {showBlogForm ? 'Cancel' : 'Write Blog'}
              </button>
            </div>

            {showBlogForm && (
              <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg p-4 sm:p-6 mb-8">
                <input
                  type="text"
                  placeholder="Blog Title"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full bg-gray-800 text-white border border-purple-500/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 mb-3 sm:mb-4 text-sm sm:text-base"
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newBlog.author}
                  onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                  className="w-full bg-gray-800 text-white border border-purple-500/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 mb-3 sm:mb-4 text-sm sm:text-base"
                />
                <textarea
                  placeholder="Blog Content"
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  className="w-full bg-gray-800 text-white border border-purple-500/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 mb-3 sm:mb-4 h-28 sm:h-32 text-sm sm:text-base"
                />
                <button
                  onClick={handleSubmitBlog}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Publish Blog
                </button>
              </div>
            )}

            {blogPosts.map(blog => (
              <div 
                key={blog._id} 
                className="bg-gray-800 p-6 rounded-lg mb-6"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl text-purple-300">{blog.title}</h3>
                  
                </div>
                <p className="text-purple-400 text-sm mb-2">
                  By {blog.author} • {new Date(blog.createdAt).toDateString()}
                </p>
                <p
                    onClick={() =>
                        blog.content.length > BLOG_PREVIEW_LENGTH &&
                        toggleReadMore(blog._id)
                    }
                    className={`text-gray-300 cursor-pointer whitespace-pre-line
                        ${
                            blog.content.length > BLOG_PREVIEW_LENGTH
                                ? "hover:text-purple-300 transition"
                                : ""
                        }
  `                 }
                >
                    {expandedBlogs[blog._id] ||
                    blog.content.length <= BLOG_PREVIEW_LENGTH ? (
                    <>
                        {blog.content}
                        {blog.content.length > BLOG_PREVIEW_LENGTH && (
                            <span className="text-purple-400 font-medium ml-1">
                                Read less
                            </span>
                        )}
                    </>
                ) : (
                    <>
                        {blog.content.slice(0, BLOG_PREVIEW_LENGTH)}...
                            <span className="text-purple-400 font-medium ml-1">
                                Read more
                            </span>
                        </>
                    )}
                </p>


              </div>
            ))}
            
          </div>
          <div className="text-center mt-10">
  <button
    onClick={() => navigate("/blogs")}
    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
  >
    See More →
  </button>
</div>

        </section>

        {/* Enhanced About Section */}
<section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
  <div className="max-w-6xl mx-auto">
    
    {/* Main Title */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
      About Vyom Club
    </h2>

    {/* Mission & Vision */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-20">
  
  {/* Mission */}
  <div className="bg-gray-900/60 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 sm:p-8 hover:border-purple-400 hover:shadow-xl transition-all duration-300">
    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-purple-300 mb-4 flex items-center gap-3">
      <Star className="text-2xl sm:text-3xl text-purple-400" />
      Our Mission
    </h3>
    <p className="text-base sm:text-lg leading-relaxed text-gray-300">
      Vyom Club is dedicated to fostering a community of individuals passionate
      about astrophysics, cosmology, and space exploration. We strive to make
      the wonders of the universe accessible through education, research,
      and hands-on learning experiences.
    </p>
  </div>

  {/* Vision */}
  <div className="bg-gray-900/60 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 sm:p-8 hover:border-purple-400 hover:shadow-xl transition-all duration-300">
    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-purple-300 mb-4 flex items-center gap-3">
      <Star className="text-2xl sm:text-3xl text-purple-400" />
      Our Vision
    </h3>
    <p className="text-base sm:text-lg leading-relaxed text-gray-300">
      To cultivate a vibrant learning environment where curiosity about the
      cosmos inspires innovation and discovery, empowering members to
      contribute meaningfully to scientific understanding and exploration.
    </p>
  </div>

</div>

    {/* Role in College Events */}
    <div className="mb-24">
      <h3 className="text-3xl sm:text-4xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-xl">
        Role in College Events
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-gray-900/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 hover:border-purple-400 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer">
          <div className="text-4xl mb-6 text-center">🎪</div>
          <h4 className="text-2xl font-bold text-purple-300 mb-4 text-center group-hover:text-purple-400">Science Fest Organizer</h4>
          <p className="text-gray-300 text-center leading-relaxed">Leading physics demonstrations and interactive exhibits</p>
        </div>
        <div className="group bg-gray-900/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 hover:border-purple-400 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer">
          <div className="text-4xl mb-6 text-center">🔬</div>
          <h4 className="text-2xl font-bold text-purple-300 mb-4 text-center group-hover:text-purple-400">Research Symposium</h4>
          <p className="text-gray-300 text-center leading-relaxed">Presenting cutting-edge research projects and findings</p>
        </div>
        <div className="group bg-gray-900/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 hover:border-purple-400 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer">
          <div className="text-4xl mb-6 text-center">🌟</div>
          <h4 className="text-2xl font-bold text-purple-300 mb-4 text-center group-hover:text-purple-400">Outreach Programs</h4>
          <p className="text-gray-300 text-center leading-relaxed">Inspiring local schools through physics demos and workshops</p>
        </div>
        <div className="group bg-gray-900/50 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 hover:border-purple-400 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer">
          <div className="text-4xl mb-6 text-center">🏆</div>
          <h4 className="text-2xl font-bold text-purple-300 mb-4 text-center group-hover:text-purple-400">Competition Team</h4>
          <p className="text-gray-300 text-center leading-relaxed">Representing the college in national physics competitions</p>
        </div>
      </div>
    </div>

    {/* Our Mentor */}
<div className="mb-20">
  <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
    Our Mentor
  </h3>

  <div className="max-w-md mx-auto">
    <div className="bg-gray-900/60 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">

      {/* Mentor Image */}
      <div className="flex justify-center mb-6">
        <img
          src={mentorImg} 
          alt="Manjunath Sir"
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-purple-400/30 shadow-md"
        />

         <img
                    src="/logo.jpg"
                    alt="Vyom Club Logo"
                    className="w-8 h-8 lg:w-10 lg:h-10 object-contain drop-shadow-lg"
                />
      </div>

      {/* Mentor Name */}
      <h4 className="text-xl sm:text-2xl font-semibold text-center text-purple-300 mb-2">
        Manjunath Sir
      </h4>

      {/* Role */}
      <p className="text-sm sm:text-base text-center text-purple-200 mb-4 tracking-wide">
        Faculty Advisor · Department of Physics
      </p>

      {/* Divider */}
      <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-4 rounded-full"></div>

      {/* Description */}
      <p className="text-gray-300 text-sm sm:text-base text-center leading-relaxed">
        An experienced physics educator and researcher with a strong background in
        astronomy. Actively mentors students in observational techniques, data
        interpretation, and scientific research methodologies.
      </p>
    </div>
  </div>
</div>


    {/* What Makes Us Unique */}
<div className="mb-20">
  <h3 className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
    What Makes Us Unique
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
    
    {/* Card 1 */}
    <div className="bg-gray-900/60 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 sm:p-8 hover:border-purple-400 hover:shadow-xl transition-all duration-300">
      <div className="text-4xl mb-5 text-center">🔭</div>
      <h4 className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 text-center">
        Innovative Projects
      </h4>
      <p className="text-gray-300 text-center text-sm sm:text-base leading-relaxed">
        We design and build hands-on prototypes, transforming innovative ideas
        into meaningful explorations inspired by the mysteries of the cosmos.
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-gray-900/60 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 sm:p-8 hover:border-purple-400 hover:shadow-xl transition-all duration-300">
      <div className="text-4xl mb-5 text-center">🌌</div>
      <h4 className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 text-center">
        Supportive Leadership
      </h4>
      <p className="text-gray-300 text-center text-sm sm:text-base leading-relaxed">
        Our office bearers and executives foster an open, friendly environment,
        ensuring that every member feels welcomed, guided, and supported.
      </p>
    </div>

    {/* Card 3 */}
    <div className="bg-gray-900/60 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 sm:p-8 hover:border-purple-400 hover:shadow-xl transition-all duration-300">
      <div className="text-4xl mb-5 text-center">🧠</div>
      <h4 className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 text-center">
        Intellectual Growth
      </h4>
      <p className="text-gray-300 text-center text-sm sm:text-base leading-relaxed">
        Regular peer-led discussions and debates centered on physics help members
        strengthen analytical thinking and scientific reasoning.
      </p>
    </div>

  </div>
</div>

    {/* Areas of Interest */}
<div className="mt-20 pt-16 border-t border-purple-500/20">
  <h3 className="text-3xl sm:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
    Areas of Interest
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-4xl mx-auto">
    
    <div className="p-5 sm:p-6 bg-gray-900/60 border border-purple-500/30 rounded-xl text-center hover:border-purple-400 hover:shadow-lg transition-all duration-300">
      <span className="text-base sm:text-lg font-semibold text-purple-300">
        Astrophysics & Cosmology
      </span>
    </div>

    <div className="p-5 sm:p-6 bg-gray-900/60 border border-purple-500/30 rounded-xl text-center hover:border-purple-400 hover:shadow-lg transition-all duration-300">
      <span className="text-base sm:text-lg font-semibold text-purple-300">
        Space Technology
      </span>
    </div>

    <div className="p-5 sm:p-6 bg-gray-900/60 border border-purple-500/30 rounded-xl text-center hover:border-purple-400 hover:shadow-lg transition-all duration-300">
      <span className="text-base sm:text-lg font-semibold text-purple-300">
        Observational Astronomy
      </span>
    </div>

    <div className="p-5 sm:p-6 bg-gray-900/60 border border-purple-500/30 rounded-xl text-center hover:border-purple-400 hover:shadow-lg transition-all duration-300">
      <span className="text-base sm:text-lg font-semibold text-purple-300">
        Research & Innovation
      </span>
    </div>

  </div>
</div>

  </div>
</section>

        {/* Register Section */}
        <section id="register" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-gray-900/30 min-h-[60vh]">
          <div className="max-w-md w-full text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Join Vyom Club
            </h2>
            <div className="bg-gray-900/50 border border-purple-500/30 rounded-lg sm:rounded-xl p-6 sm:p-8">
              <div className="mb-6">
                <div className="w-56 sm:w-64 h-56 sm:h-64 mx-auto bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <img
                  src={qrCode}
                  alt="Vyom Club WhatsApp QR Code"
                  className="w-56 h-56 object-contain"
                  />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-purple-300 mb-4">
                Scan to Join
              </h3>
              <p className="text-sm sm:text-base text-gray-300 px-2">
                Scan the QR code above to join the Vyom Club WhatsApp group and stay updated with all our events and activities!
              </p>
            </div>
          </div>
        </section> 

        {/* Simple Contact Footer Section */}
<section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-900/80 to-black border-t border-purple-500/20">
  <div className="max-w-4xl mx-auto">
    
    {/* Header */}
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Contact Us
      </h2>
      <div className="w-20 h-px bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
    </div>

    {/* Contact Info - Clean Rows */}
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 mb-12">
      
      {/* Email */}
      <div className="flex items-center gap-4 group">
        <Mail className="text-purple-400 flex-shrink-0" size={20} />
        <a href="mailto:vyomclub@university.edu" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
          vyomclub@university.edu
        </a>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-4 group">
        <Phone className="text-purple-400 flex-shrink-0" size={20} />
        <a href="tel:+919876543210" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
          +91 8341717162
        </a>
      </div>

      {/* Address */}
      <div className="flex items-start gap-4">
        <MapPin className="text-purple-400 mt-1 flex-shrink-0" size={20} />
        <div className="text-gray-300 leading-relaxed">
          <div>Department of Physics</div>
          <div>Amrita Vishwa Vidyapeetham University</div>
          <div className="text-purple-400">Bengaluru, Karnataka, India</div>
        </div>
      </div>

    </div>

    {/* Social Links - Footer Style */}
    <div className="flex justify-center gap-8 pt-8 border-t border-purple-500/20">
  
  {/* Instagram */}
  <a
    href="https://www.instagram.com/vyom.amrita?igsh=MXJ0bjRoMDR2dzQwZg=="
    target="_blank"
    rel="noopener noreferrer"
    className="group p-3 rounded-xl bg-gray-900/50 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-110"
  >
    <Instagram className="text-gray-400 group-hover:text-pink-400" size={24} />
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

        

        {/* Modals */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl max-h-full w-full max-w-sm sm:max-w-2xl md:max-w-4xl">
              <img
              src={`${API_URL}/uploads/${selectedImage.image}`}
              alt={selectedImage.caption}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              <p className="text-white text-center mt-4 text-lg sm:text-xl md:text-2xl">{selectedImage.caption}</p>
            </div>
          </div>
        )}

        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div className="bg-gray-900 border border-purple-500/50 rounded-lg max-w-sm sm:max-w-lg md:max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              <img
              src={`${API_URL}/uploads/${selectedProject.image}`}
              alt={selectedProject.title}
              className="w-full h-48 sm:h-64 md:h-72 object-cover rounded-lg mb-4 sm:mb-6"
              />

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-300 mb-4 sm:mb-6">{selectedProject.title}</h3>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">{selectedProject.description}</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm sm:text-base text-gray-400 gap-4">
                <span className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  {selectedProject.date}
                </span>
                <span className="flex items-center">
                  <Users size={18} className="mr-2" />
                  {selectedProject.contributors}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VyomClubWebsite;
