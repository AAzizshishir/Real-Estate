import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Loader/Loader";

const MakeOffer = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  console.log(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isLoading) return <Loader />;

  const onSubmit = (data) => {
    console.log(data);
    // Submit logic you will add later
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Make an Offer</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Property Title</label>
          <input
            value={property.title}
            readOnly
            className="w-full input input-bordered bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Property Location</label>
          <input
            value={property.location}
            readOnly
            className="w-full input input-bordered bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Agent Name</label>
          <input
            value={property.agentName}
            readOnly
            className="w-full input input-bordered bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Offer Amount</label>
          <input
            {...register("offerAmount", {
              required: "Offer amount is required",
            })}
            className="w-full input input-bordered"
            type="number"
            placeholder="Enter your offer amount"
          />
          {errors.offerAmount && (
            <p className="text-red-500 text-sm">{errors.offerAmount.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Buyer Email</label>
          <input
            value={user?.email}
            readOnly
            className="w-full input input-bordered bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Buyer Name</label>
          <input
            value={user?.displayName}
            readOnly
            className="w-full input input-bordered bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Buying Date</label>
          <input
            {...register("buyingDate", { required: "Buying date is required" })}
            className="w-full input input-bordered"
            type="date"
          />
          {errors.buyingDate && (
            <p className="text-red-500 text-sm">{errors.buyingDate.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Make Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
