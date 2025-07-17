import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-lime-500">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-2">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white font-semibold px-5 py-2 rounded-lg mt-6 transition"
        >
          <FaArrowLeft />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
