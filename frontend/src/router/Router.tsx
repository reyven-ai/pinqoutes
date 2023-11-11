import LogIn from "@/pages/auth/Login";
import SignUp from "@/pages/auth/Signup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  // { path: "/profile", element: <UserProfile /> },
  {
    path: "/login",
    element: <LogIn />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
