import { NavLink } from "react-router";
import {
  FaUser,
  FaPlus,
  FaList,
  FaCheckCircle,
  FaClipboardList,
} from "react-icons/fa";

import "../linksStyle.css";

const AgentLinks = () => {
  return (
    <>
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
          <FaPlus />
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
          to="/dashboard/my-sold-properties"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaCheckCircle />
          My Sold Properties
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/requested-properties"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaClipboardList />
          Requested Properties
        </NavLink>
      </li>
    </>
  );
};

export default AgentLinks;
