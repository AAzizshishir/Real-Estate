import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useUserRole from "../../hooks/useUserRole";
import axios from "axios";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { role } = useUserRole(user?.email);

  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");

  // Fetch Property
  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://real-estate-server-weld.vercel.app/properties/${id}`
      );
      return res.data;
    },
    enabled: !!id,
  });

  // Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://real-estate-server-weld.vercel.app/reviews/${id}`
      );
      return res.data;
    },
    enabled: !!id,
  });

  const { mutate: addToWishlist, isPending: isWishlistPending } = useMutation({
    mutationFn: async (wishlistData) => {
      const res = await axiosSecure.post("/wishlist", wishlistData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Added to Wishlist!",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Failed to add!",
        text: error.response?.data?.message || "Something went wrong",
      });
    },
  });

  // Mutation for adding review
  const { mutate: addReview, isPending: isReviewPending } = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post("/reviews", reviewData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", id]);
      Swal.fire("Success!", "Review added successfully!", "success");
      setReviewText("");
      setShowModal(false);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to add review.", "error");
    },
  });

  const handleSubmitReview = () => {
    if (!reviewText) {
      Swal.fire("Warning!", "Review text cannot be empty.", "warning");
      return;
    }

    const reviewData = {
      propertyId: id,
      propertyTitle: property.title,
      agentName: property.agentName,
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
      reviewerImage: user?.photoURL,
      text: reviewText,
      date: new Date(),
    };

    addReview(reviewData);
  };

  const handleAddToWishlist = () => {
    const wishlistData = {
      propertyId: property._id,
      title: property.title,
      image: property.image,
      location: property.location,
      minPrice: property.minPrice,
      maxPrice: property.maxPrice,
      status: property.status,
      agentName: property.agentName,
      agentEmail: property.agentEmail,
      agentImage: property.agentImage,
      userName: user?.displayName,
      userEmail: user?.email,
    };

    addToWishlist(wishlistData);
  };

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
        Price Range: ${property.minPrice} - ${property.maxPrice}
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
          className={property.status === "verified" ? "text-green-500" : ""}
        />
        <span
          className={
            property.status === "verified" ? "text-green-500 font-medium" : ""
          }
        >
          Verified
        </span>
      </div>

      <button
        className="btn w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition-all mt-2"
        onClick={handleAddToWishlist}
        disabled={isWishlistPending || role !== "user"}
      >
        {isWishlistPending ? "Adding..." : "Add To Wishlist"}
      </button>

      {/* Reviews section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet for this property.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded p-3 mb-2 bg-gray-50"
            >
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-8 h-8 rounded-full"
                />
                <p className="font-medium">{review.reviewerName}</p>
              </div>
              <p className="text-gray-700">{review.text}</p>
              <p className="text-gray-400 text-xs">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}

        <button
          onClick={() => setShowModal(true)}
          disabled={role !== "user"}
          className="btn btn-primary mt-4"
        >
          Add a Review
        </button>
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-lg font-bold mb-3">Write your review</h3>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="textarea textarea-bordered w-full mb-4"
              rows={4}
              placeholder="Your review..."
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmitReview}
                disabled={isReviewPending}
              >
                {isReviewPending ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
