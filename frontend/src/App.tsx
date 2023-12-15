import { Route, Routes } from "react-router-dom";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CreateProfile from "./components/userProfile/CreateProfile";
import ProfileView from "./pages/Profile";
import RootLayout from "./pages/Roots";
import HomePage from "./pages/Home";
import PrivateRoutes from "./privateRoute/PrivateRoute";

function App() {
  return (
    <ReactQueryProvider>
      <Routes>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<CreateProfile />} />
        </Route>
      </Routes>
      <RootLayout>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profileview" element={<ProfileView />} />
          </Route>
        </Routes>
      </RootLayout>
    </ReactQueryProvider>
  );
}

export default App;
