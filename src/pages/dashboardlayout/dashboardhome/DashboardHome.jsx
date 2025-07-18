import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import AdminProfile from "../../adminpage/adminprofile/AdminProfile";
import AgentProfile from "../../agentPage/agentprofile/AgentProfile";
import UserProfile from "../../userpage/userprofile/UserProfile";

const DashboardHome = () => {
  const { user } = useAuth();
  const { role, isLoading } = useUserRole(user?.email);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (role === "admin") {
    return <AdminProfile />;
  } else if (role === "agent") {
    return <AgentProfile />;
  } else {
    // default user profile
    return <UserProfile />;
  }
};

export default DashboardHome;
