import axios from "axios";

const axiosSecue = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  return axiosSecue;
};

export default useAxiosSecure;
