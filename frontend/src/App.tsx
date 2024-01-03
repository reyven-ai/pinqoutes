import { Route, Routes, useLocation } from "react-router-dom";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import Register from "./components/Auth/Auth.Register";
import Login from "./components/Auth/Auth.Login";
import ProfileCreate from "./components/Profile/Profile.Create";
import Profile from "./pages/Profile";
import HomePage from "./pages/Home/PrivateHome";
import PrivateRoutes from "./privateRoute/PrivateRoute";
import RootLayout from "./pages/Roots";
import AuthHeader from "./components/Layout/AuthHeader";
import MainHeader from "./components/Layout/MainHeader";

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
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/create" element={<ProfileCreate />} />
            </Route>
          </Routes>
        </RootLayout>
      </ReactQueryProvider>
    </>
  );
}

export default App;
