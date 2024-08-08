import { auth } from "../app/firebase";
import {signInWithGoogle} from './signInWithGoogle';

const Login = () => {
  return <button onClick={() => signInWithGoogle()}>Log In</button>;
};

export default Login;