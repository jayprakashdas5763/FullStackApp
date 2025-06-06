import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js"; // Import main component
import "./styles/index.css"; // Import global styles (if any)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
