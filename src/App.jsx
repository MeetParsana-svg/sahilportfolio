import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import HomePage from "./Pages/HomePage";
import ContactUS from "./Pages/ContactUS";
import ProjectPage from "./Pages/ProjectPage";
import ProjectDetailed from "./Pages/ProjectDetailed";
import AdminPortal from "./Pages/Admin/AdminPortal";
import { ProjectProvider } from "./context/ProjectContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { Toaster } from "react-hot-toast";

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="w-[100dvw] overflow-x-hidden min-h-screen flex flex-col">
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />

      {isAdminRoute ? (
        <main className="flex-1">
          <Routes>
            <Route path="/admin/*" element={<AdminPortal />} />
            <Route path="/admin" element={<AdminPortal />} />
          </Routes>
        </main>
      ) : (
        <>
          <Navbar />
          <main className="pt-16 flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/works" element={<ProjectPage />} />
              <Route path="/works/:id" element={<ProjectDetailed />} />
              <Route path="/contact" element={<ContactUS />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <ProjectProvider>
      <AdminAuthProvider>
        <AppContent />
      </AdminAuthProvider>
    </ProjectProvider>
  );
};

export default App;
