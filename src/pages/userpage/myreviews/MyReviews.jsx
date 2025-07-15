import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-reviews?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Removed!", "Review Deleted", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to remove review.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this review",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id);
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">You haven’t added any reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="border rounded p-4 mb-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-1">
              {review.propertyTitle || "Property Title Not Available"}
            </h3>
            <p className="text-gray-600 mb-1">
              Agent: {review.agentName || "N/A"}
            </p>
            <p className="text-gray-500 text-sm mb-2">
              {new Date(review.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-3">{review.text}</p>

            <button
              className="btn btn-error btn-sm"
              onClick={() => handleDelete(review._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviews;
