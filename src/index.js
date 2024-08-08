import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserProvider from './providers/UserProvider.js';
import "./scss/main.scss";


const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  /*  <React.StrictMode> */
  <UserProvider>
     <App />
</UserProvider>
 
  /*   </React.StrictMode> */
);
