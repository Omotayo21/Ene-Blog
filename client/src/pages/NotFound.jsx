import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-eco-light p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-eco-green mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-eco-green text-white px-6 py-3 rounded-lg hover:bg-eco-teal transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
