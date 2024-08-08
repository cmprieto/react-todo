import React, { useEffect } from "react";
import Router from "./app/Router.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./app/firebase.js";
import { useUserContext } from "./providers/UserProvider";

const App = () => {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user, " userId:", user.uid);
        setUser(user);
      } else {
        console.log("No user logged");
        setUser(null);
      }
    });
  }, []);
  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
