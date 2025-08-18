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
    <section className="px-4lg:px-10 mt-16">
      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          What Our Clients Say
        </h2>
        <p className="text-gray-700">
          Hear from happy buyers about their experiences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-gray-100 text-black p-3 rounded-lg shadow hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-2xl font-bold">{review.propertyTitle}</h2>
            <p className="italic my-3">"{review.text}"</p>
            <div className="flex items-center gap-2">
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h3 className="font-semibold text-xl">{review.reviewerName}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;
