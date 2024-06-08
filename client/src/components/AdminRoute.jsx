import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const auth = useAuth();
  if (!auth.isAuthReady) return null;
  if (!auth.isLoggedIn) return <Navigate replace to="/login" />;
  if (auth.authData.role !== "admin") return <Navigate replace to="/" />;
  return children;
};

export default AdminRoute;
