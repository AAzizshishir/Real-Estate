import { NavLink } from "react-router";
import { FaUserShield, FaUsers, FaBuilding, FaCheck } from "react-icons/fa";

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
          to="/dashboard/manage-users"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaUsers />
          Manage Users
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/manage-properties"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaBuilding />
          Manage Properties
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/approve-properties"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaCheck />
          Approve Properties
        </NavLink>
      </li>
    </>
  );
};

export default AdminLinks;
