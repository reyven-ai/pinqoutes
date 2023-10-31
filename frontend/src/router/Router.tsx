import LogIn from "@/pages/auth/Login";
import SignUp from "@/pages/auth/Signup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />, // Use the Home component directly
    children: [{ path: "/", element: <SignUp /> }], // If needed
  },
  {
    path: "/login",
    element: <LogIn />, // Use the LoginPage component for the /login route
    children: [
      // You can add more nested routes for the login page if needed
      { path: "/login", element: <LogIn /> }, // Nested route for /login/
      // { path: "forgot-password", element: <ForgotPasswordComponent /> }, // Nested route for /login/forgot-password
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
