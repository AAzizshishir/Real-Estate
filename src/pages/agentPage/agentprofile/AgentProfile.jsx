import { MdCancel, MdPending, MdVerified } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AgentProfile = () => {
  const { user } = useAuth(); // Logged-in user
  const axiosSecure = useAxiosSecure();

  // Get agent's profile info from backend
  const { data: agent = {} } = useQuery({
    queryKey: ["agentProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Get properties added by this agent
  const { data: addedProperties = [] } = useQuery({
    queryKey: ["agentProperties", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-properties?email=${user?.email}`);
      return res.data;
    },
  });

  // Fetch all offers where agentEmail = current agent's email
  const { data: offers = [] } = useQuery({
    queryKey: ["requestedProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?agentEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: soldProperties = [] } = useQuery({
    queryKey: ["soldProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/agent-sold-properties/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totalProperties = addedProperties.length;
  const requestedProperties = offers.length;
  const totalSold = soldProperties.length;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl space-y-6">
      <div className="flex items-center space-x-6">
        <img
          src={agent.image}
          alt={agent.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold">{agent.name}</h2>
          <p className="text-gray-600">{agent.email}</p>
          {/* <p className="text-sm text-gray-500">
            Joined: {moment(agent.createdAt).format("MMMM D, YYYY")}
          </p> */}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded text-center">
          <h3 className="text-xl font-semibold">{totalProperties}</h3>
          <p className="text-sm text-gray-600">Total Properties</p>
        </div>
        <div className="bg-green-100 p-4 rounded text-center">
          <h3 className="text-xl font-semibold">{requestedProperties}</h3>
          <p className="text-sm text-gray-600">Requested Properties</p>
        </div>
        <div className="bg-red-100 p-4 rounded text-center">
          <h3 className="text-xl font-semibold">{totalSold}</h3>
          <p className="text-sm text-gray-600">Sold</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Properties Added</h3>
        {addedProperties.length === 0 ? (
          <p>No properties added yet.</p>
        ) : (
          <ul className="space-y-2">
            {addedProperties.map((property) => (
              <li
                key={property._id}
                className="border p-3 rounded flex justify-between items-center"
              >
                <span>{property.title}</span>
                <span className="text-sm font-medium flex items-center gap-1">
                  {property.status === "verified" && (
                    <>
                      <MdVerified className="text-green-500" />
                      <span className="text-green-500">Verified</span>
                    </>
                  )}
                  {property.status === "pending" && (
                    <>
                      <MdPending className="text-yellow-500" />
                      <span className="text-yellow-500">Pending</span>
                    </>
                  )}
                  {property.status === "rejected" && (
                    <>
                      <MdCancel className="text-red-500" />
                      <span className="text-red-500">Rejected</span>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AgentProfile;
