import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../../utils/socialLogin/SocialLogin";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await signIn(data.email, data.password);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Loged In",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error.code);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your Email or Password Invalid",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-10">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition"
          >
            Login
          </button>
          <div className="divider text-white">OR</div>
          <SocialLogin></SocialLogin>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
