import { Outlet, Navigate } from "react-router-dom";
import { checkAuthLoader } from "../components/services/auth.services";

const PrivateRoutes = () => {
  const authenticated = checkAuthLoader();
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
