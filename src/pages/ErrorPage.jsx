import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-5xl font-bold mb-4">Oops!</h1>
      <p className="text-lg mb-6">{message}</p>
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
      >
        Go Home
      </button>
    </div>
  );
};

// ✅ Define PropTypes for validation
ErrorPage.propTypes = {
  message: PropTypes.string,
};

ErrorPage.defaultProps = {
  message: "Something went wrong!",
};

export default ErrorPage;
