
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../app/firebase";
export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(result => {
        return result.user;
    });
}

/* 
export const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth,provider);
      // El usuario ha iniciado sesión con éxito, puedes redireccionar a la página de bienvenida o hacer otras operaciones.
    } catch (error) {
      // Manejar errores de inicio de sesión.
      console.error("Error al iniciar sesión con Google:", error.message);
    }
  };

   */