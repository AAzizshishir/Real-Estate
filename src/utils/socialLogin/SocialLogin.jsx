import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SocialLogin = ({ from }) => {
  const { signInWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (userInfo) => {
      const res = await axiosSecure.post("/users", userInfo);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "User registered & saved successfully!",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Failed to save user data!",
        text: error.response?.data?.message || "Something went wrong",
      });
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const loggedUser = result.user;

      const saveUser = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        image:
          loggedUser.photoURL ||
          "https://i.ibb.co/4zjdCNs/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg",
        role: "user", // default role
      };

      mutate(saveUser);
      navigate(from);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your Email or Password Invalid",
      });
    }
  };
  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        disabled={isPending}
        className="btn bg-white text-black border-[#e5e5e5] w-full"
      >
        <FcGoogle />
        {isPending ? "logging..." : "Login with Google"}{" "}
      </button>
    </div>
  );
};

export default SocialLogin;
