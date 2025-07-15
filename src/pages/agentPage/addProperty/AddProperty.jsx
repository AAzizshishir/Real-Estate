import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

const AddProperty = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: async (propertyData) => {
      const res = await axiosSecure.post("/properties", propertyData);
      return res.data;
    },
    onSuccess: () => {
      reset();
      Swal.fire({
        icon: "success",
        title: "Property added successfully!",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Failed to add property!",
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      // image upload
      const imageFile = data.image[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbApiKey = "dac363e5ae9d4cd0d568dd8f4a926734";
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      const imageUrl = res.data.data.display_url;

      const propertyData = {
        title: data.title,
        location: data.location,
        description: data.description,
        image: imageUrl,
        agentName: user?.displayName,
        agentEmail: user?.email,
        agentImage: user?.photoURL,
        priceRange: data.priceRange,
        status: "pending", // default status
      };

      mutate(propertyData);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to upload image! ${error.message}`,
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow mt-8 md:mt-0">
      <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Property Title</label>
          <input
            {...register("title", { required: "Title is required" })}
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
            {...register("image", { required: "Image is required" })}
            className="w-full file-input file-input-bordered"
            type="file"
            accept="image/*"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
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
            {...register("priceRange", {
              required: "Price range is required",
              pattern: {
                value: /^\$\d+-\$\d+$/,
                message: "Price range must be in format: $1111-$2222",
              },
            })}
            className="w-full input input-bordered"
            type="text"
            placeholder="e.g., $400000-$500000"
          />
          {errors.priceRange && (
            <p className="text-red-500 text-sm">{errors.priceRange.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Property Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full textarea textarea-bordered"
            placeholder="Enter property description"
            rows={4}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isPending}
        >
          {isPending ? "Adding.." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
