import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader/Loader";
import { Link } from "react-router";

const MyProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["myProperties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-properties?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation for delete
  const { mutate: deleteProperty, isPending } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/properties/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Your property has been deleted.", "success");
      queryClient.invalidateQueries(["myProperties"]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete property.", "error");
    },
  });

  // Confirm and call mutation
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This property will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      deleteProperty(id);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {properties.map((property) => (
        <div key={property._id} className="card bg-white shadow-lg">
          <figure>
            <img
              src={property.image}
              alt={property.title}
              className="h-48 w-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{property.title}</h2>
            <p>Location: {property.location}</p>

            <div className="flex items-center gap-2 mt-2">
              <img
                src={property.agentImage}
                alt={property.agentName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p>{property.agentName}</p>
                <p className="text-sm text-gray-500">{property.agentEmail}</p>
              </div>
            </div>

            <p className="mt-2">
              Status:{" "}
              <span
                className={
                  property.status === "verified"
                    ? "text-green-500 font-medium"
                    : property.status === "rejected"
                    ? "text-red-500 font-medium"
                    : "text-yellow-500 font-medium"
                }
              >
                {property.status}
              </span>
            </p>

            <p>Price Range: {property.priceRange}</p>

            <div className="flex gap-2 mt-4">
              {property.status !== "rejected" && (
                <Link
                  to={`/dashboard/update-property/${property._id}`}
                  className="btn btn-sm btn-primary flex-1"
                >
                  Update
                </Link>
              )}
              <button
                onClick={() => handleDelete(property._id)}
                className="btn btn-sm btn-error flex-1"
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyProperties;
