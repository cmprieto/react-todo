import { auth } from "../app/firebase";
import { signInWithGoogle } from "./signInWithGoogle";
import { useUserContext } from "../providers/UserProvider";
import { signOut } from "firebase/auth";
import { Fragment } from "react";
import exit from "../assets/img/exit-regular-48.png";
import signin from "../assets/img/web_light_sq_SI@2x.png";

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
    <Fragment>
      {!user ? (
        <img
          src={signin}
          onClick={() => signInWithGoogle()}
          className="loginContainer--iconGoogle"
          alt="icongoogle"
        />
      ) : (
        <Fragment>
          <div className="loginContainer--user">
            <p className="josefin--700">Hola {user.displayName}!</p>
            <img
              src={exit}
              className="loginContainer--user--icon--exit"
              onClick={handleLogout}
              alt="iconexit"
            />
            <img
              src={user.photoURL}
              className="loginContainer--user--photoURL"
              alt="profilepicture"
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
