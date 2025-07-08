const reviews = [
  {
    id: 1,
    reviewerName: "Md. Rafiq",
    reviewerImage: "https://i.ibb.co/XYZ/user1.jpg",
    description:
      "The property was exactly as described and the agent was very helpful. Highly recommend!",
    propertyTitle: "Modern Family House",
  },
  {
    id: 2,
    reviewerName: "Sarah Akter",
    reviewerImage: "https://i.ibb.co/XYZ/user2.jpg",
    description:
      "Smooth buying experience, loved the location and overall service.",
    propertyTitle: "Luxury Apartment",
  },
  {
    id: 3,
    reviewerName: "Jamal Hossain",
    reviewerImage: "https://i.ibb.co/XYZ/user3.jpg",
    description: "Transparent process and great support from the agent team.",
    propertyTitle: "Cozy Villa",
  },
];

const Review = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-white dark:bg-neutral-900">
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
            key={review.id}
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
                <p className="text-xs text-gray-500">{review.propertyTitle}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "{review.description}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;
