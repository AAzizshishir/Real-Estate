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
    <section className="my-16">
      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          A Real Estate Agent You Can Trust
        </h2>
        <p className="">Meet our most trusted and high-performing agents</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {topAgents.map((agent) => (
          <div
            key={agent._id}
            className="bg-gray-100 rounded-lg shadow hover:shadow-lg transition-all duration-300 text-center p-6"
          >
            <img
              src={agent.image}
              alt={agent.name}
              className="w-24 h-24 rounded-full mx-auto object-cover mb-4 border-4 border-primary"
            />
            <h3 className="text-xl font-semibold mb-1">{agent.name}</h3>
            <p className="text-sm mb-2">Email: {agent.email}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopAgent;
