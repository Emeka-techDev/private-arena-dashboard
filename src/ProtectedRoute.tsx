
import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [searchParams] = useSearchParams();
  
  const token = searchParams.get("token") ?? null;
  if (token) {
      localStorage.setItem("authToken", token);
      window.history.replaceState({}, '', '/'); // remove token from URL
  }
  
  const { isAuthenticated } = useAuth();
 

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;