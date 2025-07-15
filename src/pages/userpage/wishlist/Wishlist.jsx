import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader/Loader";
import { MdVerified } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const Wishlist = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: wishlists = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlists"],
    queryFn: async () => {
      const res = await axiosSecure.get("/wishlist");
      return res.data;
    },
  });

  // Remove from wishlist mutation
  const { mutate: removeWishlist, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/wishlist/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Removed!", "Property removed from wishlist.", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to remove property.", "error");
    },
  });

  // Handle remove
  const handleRemove = (id) => {
    Swal.fire({
      title: "Remove Property?",
      text: "Are you sure you want to remove this property from wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        removeWishlist(id);
      }
    });
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {wishlists.map((item) => (
        <div
          key={item._id}
          className="bg-white shadow rounded-lg overflow-hidden"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h2 className="text-xl font-bold mb-1">{item.title}</h2>

            <div className="flex items-center text-gray-500 mb-2">
              <FaLocationDot className="mr-1" />
              <span>{item.location}</span>
            </div>

            <p className="text-gray-700 mb-2">
              Price: ${item.minPrice} - ${item.maxPrice}
            </p>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={item.agentImage}
                alt={item.agentName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="font-medium">{item.agentName}</p>
            </div>

            <div className="flex items-center gap-1">
              <MdVerified
                size={20}
                className={item.status === "verified" ? "text-green-500" : ""}
              />
              <span
                className={
                  item.status === "verified"
                    ? "text-green-500 font-medium"
                    : "text-gray-500"
                }
              >
                {item.status === "verified" ? "Verified" : "Not Verified"}
              </span>
            </div>

            <div className="mt-auto flex gap-2">
              <Link to={`make-offer/${item._id}`}>
                <button className="btn btn-sm btn-primary flex-1">
                  Make an Offer
                </button>
              </Link>
              <button
                onClick={() => handleRemove(item._id)}
                className="btn btn-sm btn-error flex-1"
                disabled={isPending}
              >
                {isPending ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      ))}

      {wishlists.length === 0 && (
        <p className="text-center col-span-full text-gray-500">
          No wishlist properties found.
        </p>
      )}
    </div>
  );
};

export default Wishlist;
