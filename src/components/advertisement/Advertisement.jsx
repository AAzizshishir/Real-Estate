const content = [
  {
    id: 1,
    image: "https://i.ibb.co/3yHDX9Sx/new-buildings-with-green-areas.jpg",
    title: "Modern Family House",
    location: "Uttara, Dhaka",
    priceRange: "$250,000 - $300,000",
    isVerified: true,
  },
  {
    id: 2,
    image: "https://i.ibb.co/3yHDX9Sx/new-buildings-with-green-areas.jpg",
    title: "Luxury Apartment",
    location: "Gulshan, Dhaka",
    priceRange: "$400,000 - $500,000",
    isVerified: false,
  },
  {
    id: 3,
    image: "https://i.ibb.co/3yHDX9Sx/new-buildings-with-green-areas.jpg",
    title: "Cozy Villa",
    location: "Dhanmondi, Dhaka",
    priceRange: "$350,000 - $420,000",
    isVerified: true,
  },
];

const Advertisement = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-100 dark:bg-neutral-900 mt-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Featured Properties
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Explore our hand-picked properties currently on top advertisement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-300 mt-1">
                  {item.location}
                </p>
                <p className="text-primary font-medium mt-2">
                  {item.priceRange}
                </p>

                <p
                  className={`mt-2 inline-block px-3 py-1 rounded-full text-xs ${
                    item.isVerified
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.isVerified ? "Verified" : "Pending Verification"}
                </p>
              </div>

              <button className="mt-5 w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition-all">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advertisement;
