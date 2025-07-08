import { useState } from "react";
import { Link, NavLink } from "react-router";
import { HiMenuAlt3, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>
      <li>
        <NavLink>All Properties</NavLink>
      </li>
      <li>
        <NavLink>Dashboard</NavLink>
      </li>
    </>
  );
  return (
    <nav className="w-full bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16 relative">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/WWH1HchV/logo.jpg"
            alt="PropEase"
            className="w-8 h-8"
          />
          <span className="text-xl font-bold text-primary">EstateHub</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-6 justify-center absolute left-1/2 transform -translate-x-1/2">
          {links}
        </ul>

        {/* Login/Profile Button */}
        <div className="flex items-center gap-2">
          <button className="btn btn-sm btn-primary hidden lg:inline text-white">
            <Link to="/login">Login</Link>
          </button>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <HiOutlineX className="w-6 h-6" />
            ) : (
              <HiMenuAlt3 className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu links */}
      <div
        className={`lg:hidden px-4 transition-all duration-500 ${
          menuOpen ? "max-h-screen py-2" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink
              to="/"
              className="block py-2 px-2 rounded hover:bg-gray-100"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-properties"
              className="block py-2 px-2 rounded hover:bg-gray-100"
            >
              All Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className="block py-2 px-2 rounded hover:bg-gray-100"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className="block py-2 px-2 rounded hover:bg-gray-100"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
