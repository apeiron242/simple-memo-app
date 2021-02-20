import { Link } from "react-router-dom";
import Axios from "axios";

type loginProps = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  url: string;
};

function Headers({ isLogin, setIsLogin, userId, setUserId, url }: loginProps) {
  const logout = (): void => {
    let result = window.confirm("Do you want to logout?");

    if (result) {
      setIsLogin(false);
      setUserId("");
      Axios.post(url + "/logout");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center py-2 border-b border-black">
      <Link to="/">
        <h1 className="text-2xl">Simple-Memo-App</h1>
      </Link>
      {isLogin ? (
        <div className="self-end justify-self-end pr-5 text-blue-400 text-lg">
          <span onClick={logout}>{userId}</span>
        </div>
      ) : (
        <Link
          to="/login"
          className="self-end justify-self-end pr-5 text-blue-400 text-lg"
        >
          <span>Login</span>
        </Link>
      )}
    </div>
  );
}

export default Headers;
