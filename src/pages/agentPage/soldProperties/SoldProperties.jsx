import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Loader/Loader";

const SoldProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: soldProperties = [], isLoading } = useQuery({
    queryKey: ["soldProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/agent-sold-properties/${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 bg-white rounded shadow mt-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Sold Properties</h2>

      {soldProperties.length === 0 ? (
        <p className="text-gray-500">No properties sold yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Location</th>
                <th className="py-2 px-4">Buyer Email</th>
                <th className="py-2 px-4">Buyer Name</th>
                <th className="py-2 px-4">Sold Price</th>
              </tr>
            </thead>
            <tbody>
              {soldProperties.map((property) => (
                <tr key={property._id} className="text-center">
                  <td className="py-2 px-4">{property.title}</td>
                  <td className="py-2 px-4">{property.location}</td>
                  <td className="py-2 px-4">{property.buyerEmail}</td>
                  <td className="py-2 px-4">{property.buyerName}</td>
                  <td className="py-2 px-4 font-semibold">
                    ${property.offerAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SoldProperties;
