import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Review = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [] } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("latest-reviews");
      return res.data;
    },
  });

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-white dark:bg-neutral-900 mt-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Hear from happy buyers about their experiences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-gray-50 dark:bg-neutral-800 p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {review.reviewerName}
                </h3>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white">
              {review.propertyTitle}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "{review.text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;
