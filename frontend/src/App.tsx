import { Route, Routes } from "react-router-dom";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import Register from "./components/Auth/Auth.Register";
import Login from "./components/Auth/Auth.Login";
import CreateProfile from "./components/Profile/Profile.Create";
import ProfileView from "./pages/Profile";
import HomePage from "./pages/Home/PrivateHome";
import PrivateRoutes from "./privateRoute/PrivateRoute";
import UpdateProfileForm from "./components/Profile/Profile.Update";
import RootLayout from "./pages/Roots";
function App() {
  return (
    <>
      <ReactQueryProvider>
        <RootLayout>
          <Routes>
            <Route path="/signup" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<CreateProfile />} />
            </Route>
          </Routes>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/profileview" element={<ProfileView />} />
              <Route path="/editprofile" element={<UpdateProfileForm />} />
            </Route>
          </Routes>
        </RootLayout>
      </ReactQueryProvider>
    </>
  );
}

export default App;
