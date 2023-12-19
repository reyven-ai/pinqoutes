import { Route, Routes } from "react-router-dom";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import Register from "./components/auth/Auth.RegisterForm";
import Login from "./components/auth/Auth.LoginForm";
import CreateProfile from "./components/userProfile/CreateProfile";
import ProfileView from "./pages/Profile";
import HomePage from "./pages/Home";
import PrivateRoutes from "./privateRoute/PrivateRoute";
// import RootLayout from "./pages/Roots";
import EmbeddedVideo from "./pages/Background";

function App() {
  return (
    <ReactQueryProvider>
      {/* <RootLayout> */}
      <Routes>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/s" element={<EmbeddedVideo />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<CreateProfile />} />
        </Route>
        {/* </Routes> */}
        {/* <Routes> */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profileview" element={<ProfileView />} />
        </Route>
      </Routes>
      {/* </RootLayout> */}
    </ReactQueryProvider>
  );
}

export default App;
