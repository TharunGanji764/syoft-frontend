import { Navigate } from "react-router-dom";
const getStoredData = JSON.parse(localStorage.getItem("user"));

const ProtectedRoute = ({ element }) => {
  if (!getStoredData) {
    return <Navigate to="/login" replace />;
  }
  return element;
};

export default ProtectedRoute;
