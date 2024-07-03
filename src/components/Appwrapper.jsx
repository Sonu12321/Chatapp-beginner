import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen font-segoe">
      <div className="w-full text-center bg-blue-700 text-white py-4">
        <h1 className="text-3xl">Chat App</h1>
      </div>
      <div className="flex-1 w-full mt-4 p-4 bg-gray-100 rounded-md">
        {children}
      </div>
      {isAuth && (
        <div className="mt-8">
          <button
            onClick={signUserOut}
            className="w-52 h-10 bg-blue-700 text-white rounded-md text-lg cursor-pointer hover:bg-blue-800"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
