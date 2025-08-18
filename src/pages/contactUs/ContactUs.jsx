import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const ContactUs = () => {
  const { register, handleSubmit, reset } = useForm();

  // Mutation for sending contact form
  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        "https://real-estate-server-weld.vercel.app/contact",
        data
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Message sent",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Faild to send message!",
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      const message = {
        name: data.name,
        email: data.email,
        number: data.phone,
        message: data.message,
      };

      mutate(message);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to send message!`,
      });
    }
  };
  return (
    <div className="grid md:grid-cols-2 gap-8 px-4 lg:px-10 my-20 ">
      {/* Left Section */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-3">Reach Out To Us</h2>
        <p className="text-gray-600 mb-6">
          We’re here to assist with any questions, concerns, or inquiries—
          contact us today!
        </p>

        <div className="space-y-4">
          <div>
            <p className="font-semibold">Our Address:</p>
            <p className="text-gray-600">Feni, Chittagong, Bangladesh</p>
          </div>
          <div>
            <p className="font-semibold">Contact Us:</p>
            <p className="text-gray-600">+8801874-653745</p>
          </div>
          <div>
            <p className="font-semibold">Email Address:</p>
            <p className="text-gray-600">abdulaziz.shishir.dev@gmail.com</p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-6">
          <p className="font-semibold mb-2">Follow Us:</p>
          <div className="flex gap-3 mt-3">
            <Link to={"https://www.linkedin.com/in/aashishir/"}>
              <FaLinkedin size={22} />
            </Link>
            <Link to={"https://www.facebook.com/abdul.aziz.shishir.2025"}>
              <FaFacebook size={22} />
            </Link>
            <Link to={"https://github.com/AAzizshishir"}>
              <FaGithub size={22} />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="p-6 rounded-2xl shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold mb-3">Get In Touch</h2>
        <p className="text-gray-600 mb-6">
          We’d love to hear from you! If you have any questions
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name", { required: true })}
            placeholder="Name"
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <input
            {...register("email", { required: true })}
            placeholder="Enter your email address"
            className="w-full border border-gray-300 p-3 rounded-lg"
            type="email"
          />
          <input
            {...register("phone")}
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 p-3 rounded-lg"
            type="tel"
          />

          <textarea
            {...register("message", { required: true })}
            placeholder="Your Message"
            className="w-full border border-gray-300 p-3 rounded-lg min-h-[120px]"
          ></textarea>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-[#2c22e9] transition"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
