import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Headers from "./components/Headers";
import Post from "./components/Post";
import Login from "./components/Login";
import "./assets/main.css";

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const url = "http://localhost:3001";
  // const url = ""

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get(url + `/login`).then((response): void => {
      if (response.data.loggedIn === true) {
        setIsLogin(true);
        setUserId(response.data.user[0].username);
      } else {
        console.log(response.data);
      }
    });
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <>
              <Headers
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                userId={userId}
                setUserId={setUserId}
                url={url}
              />
              <Post isLogin={isLogin} userId={userId} url={url} />
            </>
          </Route>
          <Route path="/login">
            <>
              <Headers
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                userId={userId}
                setUserId={setUserId}
                url={url}
              />
              <Login
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                userId={userId}
                setUserId={setUserId}
                url={url}
              />
            </>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
