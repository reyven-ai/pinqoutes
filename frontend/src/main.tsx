import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM from "react-dom"
import App from "./App.tsx";
import "./index.css";

// import dotenv from "dotenv";
// dotenv.config();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
