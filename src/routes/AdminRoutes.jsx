import React from "react";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/Loader/Loader";

const AdminRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const email = user?.email;

  const { role, isLoading } = useUserRole(email);

  if (isLoading || loading) {
    return <Loader></Loader>;
  }

  if (!user || role !== "admin") {
    return (
      <Navigate
        to={"/dashboard"}
        state={{ from: location.pathname }}
      ></Navigate>
    );
  }
  return children;
};

export default AdminRoutes;
