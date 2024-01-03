import { Outlet, Navigate } from "react-router-dom";
import { checkAuthLoader } from "../services/auth.util";

const PrivateRoutes = () => {
  const authenticated = checkAuthLoader();
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
