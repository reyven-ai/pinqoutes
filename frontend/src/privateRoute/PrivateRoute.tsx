import { Outlet, Navigate } from "react-router-dom";
import { checkAuthLoader } from "../services/auth.util";

const PrivateRoutes = () => {
  const { token, userId } = checkAuthLoader();
  const isAuthenticated = token !== null && userId !== null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
