import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loader from "../../components/Loader/Loader";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdVerified } from "react-icons/md";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties/verified");
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div
          key={property._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
        >
          <img
            src={property.image}
            alt={property.title}
            className="h-48 w-full object-cover"
          />
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">{property.title}</h2>
              <p className="text-gray-600 mb-1">
                <strong>Location:</strong> {property.location}
              </p>
              <p className="text-gray-600 mb-1">
                <strong>Price Range:</strong> {property.priceRange}
              </p>
              <p className="text-gray-600 mb-1 flex items-center gap-2">
                <img
                  src={property.agentImage}
                  alt={property.agentName}
                  className="w-6 h-6 rounded-full"
                />
                <span>{property.agentName}</span>
              </p>
              <div className="flex items-center gap-2">
                <MdVerified
                  size={24}
                  className={property.status === "verified" && "text-green-500"}
                />
                <span
                  className={
                    property.status === "verified" &&
                    "text-green-500 font-medium"
                  }
                >
                  Verified
                </span>
              </div>
            </div>
            <Link to={`/property-details/${property._id}`}>
              <button className="btn btn-primary btn-sm mt-4 w-full">
                Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProperties;
