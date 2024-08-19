import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider).then((result) => {
    //console.log("result redirect", result);
   // alert("se ha enviado la autenticacion y recibidio result");
    return result.user;
  });
};

/* 
export const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithRedirect(auth, provider);
      console.log('result redirect', result);
      alert('Authentication sent and result received');
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  } */
