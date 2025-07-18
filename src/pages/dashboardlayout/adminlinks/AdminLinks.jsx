import { NavLink } from "react-router";
import {
  FaBullhorn,
  FaComments,
  FaTools,
  FaUsersCog,
  FaUserShield,
} from "react-icons/fa";

const AdminLinks = () => {
  return (
    <>
      <li>
        <NavLink
          to="/dashboard/admin-profile"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaUserShield />
          Admin Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-properties"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaTools />
          Manage Properties
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-users"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaUsersCog />
          Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manage-reviews"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaComments />
          Manage Reviews
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/advertise-properties"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaBullhorn />
          Advertise Properties
        </NavLink>
      </li>
    </>
  );
};

export default AdminLinks;
