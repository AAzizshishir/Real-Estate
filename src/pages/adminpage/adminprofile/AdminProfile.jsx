import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader/Loader";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";

const AdminProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useUserRole(user?.email);

  const { data: summary = {}, isLoading } = useQuery({
    queryKey: ["adminProfileSummary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-dashboard-summary");
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6 text-center">
      {/* Admin Info */}
      <div className="flex items-start gap-6 bg-gray-100 p-6 rounded-lg shadow">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-20 h-20 rounded-full border-4 border-blue-300 object-cover"
        />
        <div className="text-left">
          <h2 className="text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <span className="inline-block mt-1 px-3 py-1 text-sm font-medium bg-blue-200 text-blue-800 rounded-full">
            {role}
          </span>
        </div>
      </div>
      {/* First Row: User Roles */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold">{summary.totalAdmins || 0}</h3>
          <p className="text-gray-600">Total Admins</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold">{summary.totalAgents || 0}</h3>
          <p className="text-gray-600">Total Agents</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold">{summary.totalUsers || 0}</h3>
          <p className="text-gray-600">Total Users</p>
        </div>
      </div>

      {/* Second Row: Properties Status */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-purple-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold">{summary.allProperties || 0}</h3>
          <p className="text-gray-600">Total Properties</p>
        </div>
        <div className="bg-green-200 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold">
            {summary.acceptedProperties || 0}
          </h3>
          <p className="text-gray-600">Accepted</p>
        </div>
        <div className="bg-yellow-200 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold">
            {summary.pendingProperties || 0}
          </h3>
          <p className="text-gray-600">Pending</p>
        </div>
        <div className="bg-red-200 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold">
            {summary.rejectedProperties || 0}
          </h3>
          <p className="text-gray-600">Rejected</p>
        </div>
      </div>

      {/* Third Row: Total Reviews */}
      <div className="bg-indigo-100 p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold">{summary.totalReviews || 0}</h3>
        <p className="text-gray-600">Total Reviews</p>
      </div>

      {/* Fourth Row: Advertised */}
      <div className="bg-pink-100 p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold">
          {summary.advertisedProperties || 0}
        </h3>
        <p className="text-gray-600">Advertised Properties</p>
      </div>
    </div>
  );
};

export default AdminProfile;
