import { NavLink } from "react-router";
import { FaUser, FaHome, FaHeart, FaClipboardCheck } from "react-icons/fa";

const UserLinks = () => {
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
          User Profile
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/my-bookings"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaHome />
          My Bookings
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/wishlist"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaHeart />
          My Wishlist
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/requested-properties"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaClipboardCheck />
          Requested Properties
        </NavLink>
      </li>
    </>
  );
};

export default UserLinks;
