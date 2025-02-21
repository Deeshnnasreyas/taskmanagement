import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a React node
};

export default ProtectedRoute;
