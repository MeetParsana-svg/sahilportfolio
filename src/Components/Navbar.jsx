import { useState } from "react";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { images } from "@/assets/assets";
import { Drawer } from "antd";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-200 
     ${
       isActive
         ? "text-blue-600 font-bold after:w-full"
         : "text-gray-700  hover:text-[#091678]"
     }`;
  return (
    <motion.nav
      className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <NavLink to="/">
          <img src={images.logoTm} className="h-10 w-auto" alt="Logo" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center relative">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/works" className={linkClass}>
            Works
          </NavLink>

          <NavLink to="/contact" className={linkClass}>
            Contact-Us
          </NavLink>
        </div>
        {/* Mobile Drawer Trigger */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        >
          <FaBars size={24} />
        </div>
      </div>

      {/* Ant Design Drawer (Mobile Full Menu) */}
      <Drawer
        title={<img src={images.logoTm} className="h-8 w-auto" alt="Logo" />}
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        rootClassName="nav-drawer"
      >
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block text-lg transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
              onClick={() => setDrawerOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/works"
              className={({ isActive }) =>
                `block text-lg transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
              onClick={() => setDrawerOpen(false)}
            >
              Works
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block text-lg transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
              onClick={() => setDrawerOpen(false)}
            >
              Contact-Us
            </NavLink>
          </li>
        </ul>
      </Drawer>
    </motion.nav>
  );
};

export default Navbar;
