import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM from "react-dom"
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { AuthContextProvider } from "./store/auth/AuthContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AuthContextProvider> */}
      <App />
      {/* </AuthContextProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
