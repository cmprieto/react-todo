import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";

export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(result => {
        return result.user;
    });
}