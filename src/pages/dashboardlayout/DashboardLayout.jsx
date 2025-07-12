import { Link, NavLink, Outlet } from "react-router";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

import "../dashboardlayout/linksStyle.css";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import AgentLinks from "./agentlinks/AgentLinks";
import AdminLinks from "./adminlinks/AdminLinks";
import UserLinks from "./userlinks/UserLinks";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { role, isLoading } = useUserRole(user?.email);

  if (isLoading)
    return <p className="text-center mt-20 text-primary">Loading...</p>;

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
          {role === "user" && <UserLinks />}
          {role === "agent" && <AgentLinks />}
          {role === "admin" && <AdminLinks />}
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
