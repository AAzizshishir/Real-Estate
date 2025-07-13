import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res.data;
    },
  });

  // Verify property
  const { mutate: verifyProperty } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/properties/verify/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Property verified.", "success");
      queryClient.invalidateQueries(["properties"]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to verify property.", "error");
    },
  });

  // Reject property
  const { mutate: rejectProperty } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/properties/reject/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Rejected!", "Property rejected.", "success");
      queryClient.invalidateQueries(["properties"]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to reject property.", "error");
    },
  });

  if (isLoading) return <p>Loading properties...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Properties</h2>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4 text-left">Location</th>
            <th className="py-2 px-4 text-left">Agent Name</th>
            <th className="py-2 px-4 text-left">Agent Email</th>
            <th className="py-2 px-4 text-left">Price Range</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id} className="border-b">
              <td className="py-2 px-4">{property.title}</td>
              <td className="py-2 px-4">{property.location}</td>
              <td className="py-2 px-4">{property.agentName}</td>
              <td className="py-2 px-4">{property.agentEmail}</td>
              <td className="py-2 px-4">{property.priceRange}</td>
              <td className="py-2 px-4 flex gap-2">
                {property.status === "verified" ? (
                  <span className="text-green-600 font-semibold mt-3">
                    Verified
                  </span>
                ) : property.status === "rejected" ? (
                  <span className="text-red-600 font-semibold mt-3">
                    Rejected
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        Swal.fire({
                          title: "Verify Property?",
                          text: "Are you sure you want to verify this property?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes, Verify",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            verifyProperty(property._id);
                          }
                        })
                      }
                      className="btn btn-success btn-sm"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() =>
                        Swal.fire({
                          title: "Reject Property?",
                          text: "Are you sure you want to reject this property?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes, Reject",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            rejectProperty(property._id);
                          }
                        })
                      }
                      className="btn btn-error btn-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {properties.length === 0 && (
            <tr>
              <td colSpan="6" className="py-4 text-center">
                No properties found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProperties;
