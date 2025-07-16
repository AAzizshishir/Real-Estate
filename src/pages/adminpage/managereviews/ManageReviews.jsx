import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader/Loader";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all reviews
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  // Delete mutation
  const { mutate: deleteReview, isPending } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Review has been deleted.", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete review.", "error");
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">All User Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review) => (
            <div key={review._id} className="border rounded p-4 bg-gray-50">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{review.reviewerName}</p>
                  <p className="text-gray-500 text-sm">
                    {review.reviewerEmail}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-2">{review.text}</p>
              <button
                onClick={() =>
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteReview(review._id);
                    }
                  })
                }
                className="btn btn-error btn-sm"
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageReviews;
