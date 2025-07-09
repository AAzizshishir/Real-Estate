import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import SocialLogin from "../../utils/socialLogin/SocialLogin";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, profileUpdate } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // ✅ Create user
      await createUser(data.email, data.password);

      // ✅ Upload image
      const imageFile = data.file[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imgbbApiKey = "dac363e5ae9d4cd0d568dd8f4a926734";
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );

      if (res.data.success) {
        const imageUrl = res.data.data.display_url;

        // ✅ Update profile
        await profileUpdate({
          displayName: data.name,
          photoURL: imageUrl,
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Account Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.log("Image upload failed");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Image upload failed",
        });
      }
    } catch (error) {
      console.log("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          Create your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary/30 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="Enter Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors?.name?.message}</p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              {...register("file", { required: "Image is required" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary/30 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            {errors.file && (
              <p className="text-red-500 text-sm">{errors?.image?.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary/30 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="Enter Your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors?.email?.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                  message:
                    "Must include capital letter, small letter, Number & Special Character",
                },
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary/30 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="Enter Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors?.password?.message}
              </p>
            )}
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-400 text-sm"
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Register
          </button>
          <div className="divider text-white">OR</div>
          <SocialLogin></SocialLogin>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
