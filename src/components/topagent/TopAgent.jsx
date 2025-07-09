const agents = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://i.ibb.co/3y7CV9gL/portrait-male-real-estate-agent.jpg",
    sales: 120,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Michael Lee",
    image: "https://i.ibb.co/3y7CV9gL/portrait-male-real-estate-agent.jpg",
    sales: 95,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Ayesha Khan",
    image: "https://i.ibb.co/3y7CV9gL/portrait-male-real-estate-agent.jpg",
    sales: 85,
    rating: 4.7,
  },
  {
    id: 4,
    name: "David Kim",
    image: "https://i.ibb.co/3y7CV9gL/portrait-male-real-estate-agent.jpg",
    sales: 75,
    rating: 4.6,
  },
];

const TopAgent = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-neutral-900 my-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Top Agents
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Meet our most trusted and high-performing agents
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 text-center p-6"
          >
            <img
              src={agent.image}
              alt={agent.name}
              className="w-24 h-24 rounded-full mx-auto object-cover mb-4 border-4 border-primary"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
              {agent.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm mb-2">
              Sales: {agent.sales}
            </p>
            <p className="text-yellow-500 flex justify-center items-center gap-1 text-sm">
              ⭐ {agent.rating}
            </p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopAgent;
