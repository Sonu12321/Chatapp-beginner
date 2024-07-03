import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <p>Sign In With Google To Continue</p>
      <button
        onClick={signInWithGoogle}
        className="w-52 h-12 bg-blue-700 text-white rounded-lg text-lg cursor-pointer"
      >
        Sign In With Google
      </button>
    </div>
  );
};
