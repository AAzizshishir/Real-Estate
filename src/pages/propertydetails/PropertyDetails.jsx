import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import Loader from "../../components/Loader/Loader";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded shadow">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-80 object-cover rounded mb-6"
      />
      <h2 className="text-3xl font-bold mb-2">{property.title}</h2>

      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <FaLocationDot />
        <span>{property.location}</span>
      </div>

      <p className="text-gray-700 mb-4">
        {property.description || "No description provided by the agent."}
      </p>

      <p className="font-semibold text-lg mb-2">
        Price Range: {property.priceRange}
      </p>

      <div className="flex items-center gap-3 mb-4">
        <img
          src={property.agentImage}
          alt={property.agentName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{property.agentName}</p>
          <p className="text-gray-500 text-sm">{property.agentEmail}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <MdVerified
          size={24}
          className={property.status === "verified" && "text-green-500"}
        />
        <span
          className={
            property.status === "verified" && "text-green-500 font-medium"
          }
        >
          Verified
        </span>
      </div>
    </div>
  );
};

export default PropertyDetails;
