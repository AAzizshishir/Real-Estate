import { NavLink } from "react-router";
import { FaUser, FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

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
          My Profile
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
          Wishlist
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/bought-properties"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaShoppingCart />
          Property Bought
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-reviews"
          className={({ isActive }) =>
            isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
          }
        >
          <FaStar />
          My Reviews
        </NavLink>
      </li>
    </>
  );
};

export default UserLinks;
