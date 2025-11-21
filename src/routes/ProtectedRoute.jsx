import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {

  // ✅ FIRST define values
  const { isLoggedIn, authUser } = useAuthContext();

  // 🔥 THEN do debug logs safely
  // console.log("ProtectedRoute → isLoggedIn:", isLoggedIn);
  // console.log("ProtectedRoute → authUser:", authUser);
  // console.log("ProtectedRoute → accessToken:", authUser?.auth?.accessToken);
  // console.log("ProtectedRoute → userId:", authUser?.user?._id);

  // ⏳ Still loading AuthContext state
  if (isLoggedIn === undefined) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        Checking authentication...
      </div>
    );
  }

  // ❌ Not logged in OR missing token
  if (!isLoggedIn || !authUser?.auth?.accessToken) {
    console.warn("Redirect → Missing token or not logged in");
    return <Navigate to="/login" replace />;
  }

  // ❌ Missing userId = corrupted stored state
  if (!authUser?.user?._id) {
    console.warn("Redirect → userId missing, clearing storage");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  // ✔ All good
  return children;
};

export default ProtectedRoute;
