import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = (email) => {
  const axiosSecure = useAxiosSecure();

  const { data: user = {}, isLoading } = useQuery({
    queryKey: ["userRole", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      return res.data;
    },
    enabled: !!email, // শুধু তখনই রান করবে যখন email থাকবে
  });

  return { role: user.role, user, isLoading };
};

export default useUserRole;
