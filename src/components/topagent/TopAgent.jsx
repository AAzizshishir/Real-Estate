import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../Loader/Loader";

const TopAgent = () => {
  const axiosSecure = useAxiosSecure();

  const { data: topAgents = [], isLoading } = useQuery({
    queryKey: ["topAgents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-agents");
      return res.data;
    },
  });

  if (isLoading) return <Loader></Loader>;

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {topAgents.map((agent) => (
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
              Email: {agent.email}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopAgent;
