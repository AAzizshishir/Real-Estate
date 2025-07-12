import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const useAddProperty = () => {
  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async (propertyData) => {
      const res = await axiosSecure.post("/properties", propertyData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Property added!",
        text: "Your property has been successfully added.",
      });
    },
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    },
  });

  return mutation;
};

export default useAddProperty;
