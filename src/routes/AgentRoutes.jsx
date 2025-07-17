import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import useUserRole from "../hooks/useUserRole";
import Loader from "../components/Loader/Loader";

const AgentRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const email = user?.email;

  const { role, isLoading } = useUserRole(email);

  if (isLoading || loading) {
    return <Loader></Loader>;
  }

  if (!user || role !== "agent") {
    return (
      <Navigate
        to={"/dashboard"}
        state={{ from: location.pathname }}
      ></Navigate>
    );
  }
  return children;
};

export default AgentRoutes;
