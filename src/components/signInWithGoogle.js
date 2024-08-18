import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../app/firebase";

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(result => {
        return result.user;
    });
}
