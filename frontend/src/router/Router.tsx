// import UserProfile from "@/components/userProfile/userProfile";
import LogIn from "@/pages/auth/Login";
import SignUp from "@/pages/auth/Signup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
    children: [{ path: "/signup", element: <SignUp /> }],
  },
  // { path: "/profile", element: <UserProfile /> },
  {
    path: "/login",
    element: <LogIn />,
    children: [
      { path: "/login", element: <LogIn /> },
      // { path: "forgot-password", element: <ForgotPasswordComponent /> }, // Nested route for /login/forgot-password
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
