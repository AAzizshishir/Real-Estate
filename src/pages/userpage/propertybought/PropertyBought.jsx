import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Loader/Loader";
import { Link } from "react-router";

const PropertyBought = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["boughtProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bought-properties?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {properties.length === 0 ? (
        <p className="text-center text-gray-500 col-span-2">
          You haven't bought any properties yet.
        </p>
      ) : (
        properties.map((property) => (
          <div
            key={property._id}
            className="bg-white shadow rounded p-4 flex flex-col justify-between"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-bold mb-1">{property.title}</h3>
            <p className="text-gray-600 mb-1">{property.location}</p>
            <p className="text-gray-500">Agent: {property.agentName}</p>
            <p className="font-semibold text-green-600 mb-2">
              Offered: ${property.offerAmount}
            </p>
            <p className="text-sm text-gray-500">Status: {property.status}</p>
            {property.status === "accepted" && (
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition duration-300"
                // onClick={() => handlePay(property)}
              >
                Pay Now
              </button>
            )}

            {property.status === "bought" && (
              <p className="text-green-600 font-semibold">
                {/* Transaction ID: {property.transactionId} */}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PropertyBought;
