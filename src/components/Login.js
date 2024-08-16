import { auth } from "../app/firebase";
import { signInWithGoogle } from "./signInWithGoogle";
import { useUserContext } from "../providers/UserProvider";
import { signOut } from "firebase/auth";
import { useEffect } from "react";


const Login = () => {
  const { user } = useUserContext();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Usuario desconectado");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <div>
      {!user ? (
        <button onClick={() => signInWithGoogle()}>Log In</button>
      ) : (
        <div>
          <button onClick={handleLogout}>Cerrar Sesión</button>
          <p>{user.displayName}</p>
          <img src={user.photoURL} alt="profilepicture" />
        </div>
      )}
    </div>
  );
};

export default Login;
