import { useQuery } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaHome, FaMoneyCheck } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader/Loader";

const UserProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ✅ Load user info from DB
  const { data: userInfo = {}, isLoading: userLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  // ✅ Load offered properties
  const { data: offerProperties = [] } = useQuery({
    queryKey: ["userOffers", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bought-properties?email=${user.email}`
      );
      return res.data;
    },
  });

  const offerdProperties = offerProperties.filter(
    (property) => property.status === "pending"
  );

  // ✅ Load purchased properties
  const { data: purchasedProperties = [] } = useQuery({
    queryKey: ["purchasedProperties", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bought-properties?email=${user.email}`
      );
      return res.data;
    },
  });

  const boughtProperties = purchasedProperties.filter(
    (property) => property.status === "bought"
  );

  if (loading || userLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex items-center gap-6">
          <img
            src={userInfo.image}
            alt={userInfo.name}
            className="w-24 h-24 rounded-full border-4 border-lime-400 object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FaUser /> {userInfo.name}
            </h2>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <FaEnvelope /> {userInfo.email}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Role: <span className="font-medium">{userInfo.role}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Offered Properties */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-lime-600">
            <FaHome /> Offered Properties ({offerdProperties.length})
          </h3>
          <ul className="list-disc ml-5 text-gray-700">
            {offerdProperties.map((prop) => (
              <li key={prop._id}>
                {prop.title} - ${prop.offerAmount.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>

        {/* Purchased Properties */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-blue-600">
            <FaMoneyCheck /> Purchased Properties ({boughtProperties.length})
          </h3>
          <ul className="list-disc ml-5 text-gray-700">
            {boughtProperties.map((prop) => (
              <li key={prop._id}>
                {prop.title} - ${prop.offerAmount.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
