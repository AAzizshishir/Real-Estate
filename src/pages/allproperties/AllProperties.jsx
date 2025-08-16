import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loader from "../../components/Loader/Loader";
import { MdVerified } from "react-icons/md";
import { useState } from "react";
import axios from "axios";

const AllProperties = () => {
  const [searchText, setSearchText] = useState("");

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      const res = await axios.get(
        "https://real-estate-server-weld.vercel.app/properties/verified"
      );
      return res.data;
    },
  });

  const filtered = properties.filter((property) =>
    property.location.toLowerCase().includes(searchText.toLowerCase())
  );

  if (isLoading) return <Loader></Loader>;

  return (
    <div>
      {/* ✅ Search Input */}
      <div className="flex gap-2 m-6">
        <input
          type="text"
          placeholder="Search by location"
          className="input input-bordered w-full max-w-sm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <Loader></Loader>
        ) : filtered.length === 0 ? (
          <p>No properties found for "{searchText}"</p>
        ) : (
          filtered.map((property) => (
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
                    <strong>Price Range:</strong> ${property.minPrice} - $
                    {property.maxPrice}
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
                      className={
                        property.status === "verified" && "text-green-500"
                      }
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
          ))
        )}
      </div>
    </div>
  );
};

export default AllProperties;
