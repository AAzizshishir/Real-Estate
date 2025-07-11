import { Link, NavLink, Outlet } from "react-router";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdDashboard, MdOutlineFavoriteBorder } from "react-icons/md";
import {
  FaUser,
  FaRegListAlt,
  FaPlusSquare,
  FaList,
  FaChartBar,
  FaClipboardList,
} from "react-icons/fa";
import "../dashboardlayout/linksStyle.css";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed z-50 bg-white shadow-md transition-transform duration-300 ease-in-out
          md:static md:translate-x-0 w-64 p-4
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-2xl font-bold mb-4 text-primary mt-8">
          <Link to={"/"}>EstateHub</Link>
        </h2>
        <ul className="space-y-3">
          {/* User Links */}
          {/* <li>
            <NavLink
              to="/dashboard/user/profile"
              className="flex items-center gap-2 p-2 rounded hover:bg-primary/20 transition"
            >
              <FaUser />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user/wishlist"
              className="flex items-center gap-2 p-2 rounded hover:bg-primary/20 transition"
            >
              <MdOutlineFavoriteBorder />
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user/property-bought"
              className="flex items-center gap-2 p-2 rounded hover:bg-primary/20 transition"
            >
              <FaRegListAlt />
              Bought
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/user/my-reviews"
              className="flex items-center gap-2 p-2 rounded hover:bg-primary/20 transition"
            >
              <MdDashboard />
              My Reviews
            </NavLink>
          </li> */}

          {/* Agent Links */}
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
              }
            >
              <FaUser />
              Agent Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-property"
              className={({ isActive }) =>
                isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
              }
            >
              <FaPlusSquare />
              Add Property
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-properties"
              className={({ isActive }) =>
                isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
              }
            >
              <FaList />
              My Added Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/sold-properties"
              className={({ isActive }) =>
                isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
              }
            >
              <FaChartBar />
              My Sold Properties
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/agent/requested-properties"
              className={({ isActive }) =>
                isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
              }
            >
              <FaClipboardList />
              Requested Properties
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-4 left-4 z-50 md:hidden text-2xl text-primary"
      >
        <FiMenu />
      </button>

      {/* Content area */}
      <div className="flex-1 ml-0 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
