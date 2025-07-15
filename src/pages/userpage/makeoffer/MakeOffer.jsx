import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";

const MakeOffer = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: wishlist = {}, isLoading } = useQuery({
    queryKey: ["wishlist", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isLoading) return <Loader />;

  const minPrice = wishlist.minPrice;
  const maxPrice = wishlist.maxPrice;

  const onSubmit = (data) => {
    const offerAmount = data.offerAmount;

    // ✅ Validate offer amount range here
    if (offerAmount <= minPrice || offerAmount >= maxPrice) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Offer amount must be between $${minPrice} and $${maxPrice}`,
      });
      return;
    }

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
            value={wishlist.title}
            readOnly
            className="w-full input input-bordered bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Property Location</label>
          <input
            value={wishlist.location}
            readOnly
            className="w-full input input-bordered bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Agent Name</label>
          <input
            value={wishlist.agentName}
            readOnly
            className="w-full input input-bordered bg-gray-100"
          />
        </div>

        <p className="text-gray-700 font-medium">
          Agent Price Range: ${wishlist.minPrice} - ${wishlist.maxPrice}
        </p>

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
