import { Route, Routes, useLocation } from "react-router-dom";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import Login from "./components/auth/Auth.Login";
import Register from "./components/auth/Auth.Register";
import ProfileCreate from "./components/Profile/Profile.Create";
import Profile from "./pages/Profile/Profile";
import PrivateRoutes from "./privateRoute/PrivateRoute";
import RootLayout from "./pages/Roots";
import AuthHeader from "./components/Layout/AuthHeader";
import MainHeader from "./components/Layout/MainHeader";

import PrivateHomePage from "./pages/Home/PrivateHome";
import People from "./pages/People";
import PinDetails from "./components/pin/Pin.Details";
import PinCreate from "./components/pin/Pin.Create";
import PinUpdate from "./components/pin/Pin.Update";

function App() {
  const location = useLocation();
  const getHeaderComponent = () => {
    if (
      location.pathname.includes("/signup") ||
      location.pathname.includes("/profile/create") ||
      location.pathname.includes("/login")
    ) {
      return <AuthHeader />;
    } else {
      return <MainHeader />;
    }
  };

  return (
    <>
      <ReactQueryProvider>
        <RootLayout>
          {getHeaderComponent()}
          <Routes>
            <Route path="/signup" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<PrivateHomePage />} />
              <Route path="/people" element={<People />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/profile/create" element={<ProfileCreate />} />
              <Route path="/pins/:id" element={<PinDetails />} />
              <Route path="/pin/create" element={<PinCreate />} />
              <Route path="/pin/edit" element={<PinUpdate />} />
            </Route>
          </Routes>
        </RootLayout>
        <Toaster position="top-right" />
      </ReactQueryProvider>
    </>
  );
}

export default App;
