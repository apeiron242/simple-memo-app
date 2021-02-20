import React, { useState, useRef } from "react";
import Axios, { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";

type loginProps = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  url: string;
};

function Login({ isLogin, setIsLogin, userId, setUserId, url }: loginProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const rmId = useRef<any>(null);
  const rmPassword = useRef<any>(null);
  let history = useHistory();

  const login = (): void => {
    Axios.post(url + "/login", {
      username,
      password,
    }).then((res: AxiosResponse) => {
      if (
        res.data !== "err" ||
        res.data !== "Wrong Username or Password" ||
        res.data !== "User doesn't exist"
      ) {
        setIsLogin(true);
        setUserId(res.data[0].username);
        history.push("/");
      }
    });
  };

  const register = (): void => {
    if (newUsername.length >= 4 && newPassword.length >= 4) {
      Axios.post(url + "/register", {
        newUsername,
        newPassword,
      }).then((res: AxiosResponse) => {
        if (res.data === "err") {
          alert("Register has been failed");
        } else if (res.data === "exist") {
          alert(`Username '${newUsername}' already exist`);
          rmId.current.value = "";
          rmPassword.current.value = "";
        } else {
          alert("Register has been successful! Please Login");
          rmId.current.value = "";
          rmPassword.current.value = "";
        }
      });
    } else {
      alert("Username and password should be longer than 4 characters");
      rmId.current.value = "";
      rmPassword.current.value = "";
    }
  };
  return (
    <div className="flex flex-col justify-center items-center m-2">
      <div className="flex flex-col justify-center items-center w-full">
        <h3 className="text-xl">Login</h3>
        <input
          type="text"
          placeholder="ID"
          className="border-2 border-black pl-1 m-2 w-3/4 md:w-1/4"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-black pl-1 m-2 w-3/4 md:w-1/4"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button className="border-2 border-black px-2 m-2" onClick={login}>
          Login
        </button>
      </div>
      <div className="flex flex-col justify-center items-center w-full m-3">
        <h3 className="text-xl">Register</h3>
        <input
          type="text"
          placeholder="ID"
          className="border-2 border-black pl-1 m-2 w-3/4 md:w-1/4"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewUsername(e.target.value)
          }
          ref={rmId}
        />
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-black pl-1 m-2 w-3/4 md:w-1/4"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewPassword(e.target.value)
          }
          ref={rmPassword}
        />
        <button className="border-2 border-black px-2 m-2" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
