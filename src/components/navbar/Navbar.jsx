import { useState } from "react";
import { Link, NavLink } from "react-router";
import { HiMenuAlt3, HiOutlineX } from "react-icons/hi";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import "../../pages/dashboardlayout/linksStyle.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const links = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/all-properties"}
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          All Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard"}
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Something went wrong! ${error}`,
      });
    }
  };

  return (
    <nav className="w-full bg-white text-text shadow fixed top-0 left-0 z-50 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16 relative">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/WWH1HchV/logo.jpg"
            alt="PropEase"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-xl font-bold text-primary">EstateHub</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-6 justify-center absolute left-1/2 transform -translate-x-1/2">
          {links}
        </ul>

        {/* Login/Profile Button */}
        <div className="flex items-center gap-2">
          {user && <h2 className="font-semibold">{user.displayName}</h2>}
          {user && (
            <img
              src={user?.photoURL}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
              title={user?.email}
            />
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-primary hidden lg:inline text-white"
            >
              Logout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary hidden lg:inline text-white">
              <Link to="/login">Login</Link>
            </button>
          )}

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
            {user ? (
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-primary hidden lg:inline text-white"
              >
                Logout
              </button>
            ) : (
              <button className="btn btn-sm btn-primary hidden lg:inline text-white">
                <Link to="/login">Login</Link>
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
