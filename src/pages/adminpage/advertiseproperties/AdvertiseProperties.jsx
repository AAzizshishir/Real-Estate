import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";

const AdvertiseProperties = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: properties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties/verified");
      return res.data;
    },
  });

  // ✅ Mutation for advertising
  const { mutate: advertiseProperty, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/properties/advertise/${id}`, {
        advertise: true,
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Property marked for advertisement!", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to advertise property.", "error");
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 bg-white rounded shadow mt-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Advertise Properties</h2>

      {properties.length === 0 ? (
        <p className="text-gray-500">No verified properties found.</p>
      ) : (
        <table className="w-full table">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Price Range</th>
              <th className="py-2 px-4">Agent Name</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id} className="text-center">
                <td className="py-2 px-4">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4">{property.title}</td>
                <td className="py-2 px-4">
                  ${property.minPrice} - ${property.maxPrice}
                </td>
                <td className="py-2 px-4">{property.agentName}</td>
                <td className="py-2 px-4">
                  {property.advertise ? (
                    <span className="text-green-600 font-semibold">
                      Advertised
                    </span>
                  ) : (
                    <button
                      onClick={() => advertiseProperty(property._id)}
                      className="btn btn-primary btn-sm"
                      disabled={isPending}
                    >
                      {isPending ? "Advertising..." : "Advertise"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdvertiseProperties;
