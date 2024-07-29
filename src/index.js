import React from "react";
import ReactDOM from "react-dom/client";
import UserProvider from "./providers/UserProvider";
import App from "./App";
import "./scss/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
