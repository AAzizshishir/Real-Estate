import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../components/Loader/Loader";
import Swal from "sweetalert2";

const UpdateProperty = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch existing property data
  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      return {
        title: property.title,
        location: property.location,
        priceRange: property.priceRange,
      };
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (updatedProperty) => {
      const res = await axiosSecure.put(`/properties/${id}`, updatedProperty);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Property updated successfully.", "success");
      navigate("/dashboard/my-properties");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update property.", "error");
    },
  });

  if (isLoading) return <Loader />;

  const onSubmit = async (data) => {
    try {
      let imageUrl = property.image;

      // If user set new image
      if (data.image && data.image.length > 0) {
        const imageFile = data.image[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        const imgbbApiKey = "dac363e5ae9d4cd0d568dd8f4a926734";
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData
        );
        imageUrl = res.data.data.display_url;
      }

      const updatedProperty = {
        title: data.title,
        location: data.location,
        image: imageUrl,
        agentName: user?.displayName,
        agentEmail: user?.email,
        priceRange: data.priceRange,
        status: "pending", // আবার pending set করলে এডমিন approve করবে
      };

      mutate(updatedProperty);
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to update property.", "error");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow mt-8 md:mt-0 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Property</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Property Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            defaultValue={property.title}
            className="w-full input input-bordered"
            type="text"
            placeholder="Enter property title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Property Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            defaultValue={property.location}
            className="w-full input input-bordered"
            type="text"
            placeholder="Enter property location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Property Image</label>
          <input
            {...register("image")}
            className="w-full file-input file-input-bordered"
            type="file"
            accept="image/*"
          />
        </div>

        <div>
          <label className="block mb-1">Agent Name</label>
          <input
            defaultValue={user?.displayName}
            readOnly
            className="w-full input input-bordered bg-gray-100"
            type="text"
          />
        </div>

        <div>
          <label className="block mb-1">Agent Email</label>
          <input
            defaultValue={user?.email}
            readOnly
            className="w-full input input-bordered bg-gray-100"
            type="email"
          />
        </div>

        <div>
          <label className="block mb-1">Price Range</label>
          <input
            {...register("priceRange", { required: "Price range is required" })}
            defaultValue={property.priceRange}
            className="w-full input input-bordered"
            type="text"
            placeholder="e.g., $400000-$500000"
          />
          {errors.priceRange && (
            <p className="text-red-500 text-sm">{errors.priceRange.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isPending}
        >
          {isPending ? "Updating" : "Update Property"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
