import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  if (!auth.isAuthReady) return null;
  if (!auth.isLoggedIn) return <Navigate replace to="/login" />;
  return children;
};

export default ProtectedRoute;
