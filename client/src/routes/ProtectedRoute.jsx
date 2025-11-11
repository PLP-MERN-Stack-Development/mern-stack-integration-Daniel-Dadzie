// --- routes/ProtectedRoute.jsx ---
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute component
 * ------------------------
 * This ensures that only logged-in users (with a valid token in localStorage)
 * can access certain pages like CreatePost or EditPost.
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected page
  return children;
};

export default ProtectedRoute;
