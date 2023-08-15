import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Main";
import OnetoFifty from "./games/OnetoFifty";
import VsOmok from "./games/VsOmok";
import Kakao from "./oauth/Kakao";
import OAuth from "./oauth/OAuth";
import Login from "./users/Login";
import Users from "./users/Users";
import Register from "./users/Register";
import axios from "axios";
import AuthContext from "./AuthContext";
import { useState } from "react";

function App() {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.withCredentials = true;

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [refreshed, setRefreshed] = useState(null);
  const [csrf, setCsrf] = useState(null);

  // 경로 설정
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "games",
          element: "",
          children: [
            { path: "vsomok", element: <VsOmok /> },
            { path: "onetofifty", element: <OnetoFifty /> },
          ],
        },
        {
          path: "users",
          element: <Users />,
          children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
          ],
        },
        { path: "oauth", element: <OAuth />, children: [{ path: "kakao", element: <Kakao /> }] },
      ],
    },
  ]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, accessToken, setAccessToken, nickname, setNickname, refreshed, setRefreshed, csrf, setCsrf }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
