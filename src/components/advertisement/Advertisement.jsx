import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const Advertisement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: advertise = [] } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertised");
      return res.data;
    },
  });

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 mt-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Featured Properties
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Explore our hand-picked properties currently on top advertisement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {advertise.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-300 mt-1">
                  {item.location}
                </p>
                <p className="text-primary font-medium mt-2">
                  ${item.minPrice} - ${item.maxPrice}
                </p>

                <p
                  className={`mt-2 inline-block px-3 py-1 rounded-full text-xs bg-green-100 text-green-600 `}
                >
                  Verified
                </p>
              </div>

              <Link to={`/property-details/${item._id}`}>
                <button className="mt-5 btn w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition-all">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advertisement;
