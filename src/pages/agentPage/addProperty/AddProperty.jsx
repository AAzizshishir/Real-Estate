import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAddProperty from "./useAddProperty";

const AddProperty = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { mutate, isPending } = useAddProperty();
  console.log("isPending:", isPending);

  const onSubmit = async (data) => {
    console.log(data);
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

      // Post to backend
      mutate(propertyData, {
        onSuccess: () => {
          reset();
        },
      });
      Swal.fire({
        icon: "success",
        title: "Property added successfully!",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to add property! ${error.message}`,
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
            {...register("priceRange", { required: "Price range is required" })}
            className="w-full input input-bordered"
            type="text"
            placeholder="e.g., $50000 - $80000"
          />
          {errors.priceRange && (
            <p className="text-red-500 text-sm">{errors.priceRange.message}</p>
          )}
        </div>

        {/* Description */}
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
          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Add Property"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
