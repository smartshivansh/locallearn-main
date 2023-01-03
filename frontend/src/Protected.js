import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ isSignedIn, children }) {
  const isAuth = useSelector((state) => state.authstatus.isAuthenticated);
  if (isAuth === "null") {
    return children;
  } else if (!isAuth) {
    return <Navigate to="/app/login" />;
  } else if (isAuth) {
    return children;
  }
  // return children;
}
export default Protected;
