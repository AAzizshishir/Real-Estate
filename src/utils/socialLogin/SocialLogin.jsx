import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Login With Google",
        showConfirmButton: false,
        timer: 1500,
      });
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
        className="btn bg-white text-black border-[#e5e5e5] w-full"
      >
        <FcGoogle />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
