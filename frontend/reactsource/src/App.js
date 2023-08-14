import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Main";

import OnetoFifty from "./games/OnetoFifty";
import VsOmok from "./games/VsOmok";
import Kakao from "./oauth/Kakao";
import OAuth from "./oauth/OAuth";
import Login from "./users/Login";
import Users from "./users/Users";
import Register from "./users/Register";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.withCredentials = true;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    requestNewCsrfToken();
  }, []);

  function requestNewCsrfToken() {
    axios.get("https://127.0.0.1:8000/csrf/token").catch((error) => console.error("Error getting new CSRF token:", error));
  }

  /* JWT httponly 통신 설정 */
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // 401 상태 코드 처리 - jwt 만료
      if (error.response && error.response.status === 401) {
        // 새 액세스 토큰 발급 요청
        return axios
          .post("https://127.0.0.1:8000/api/token/refresh")
          .then((response) => {
            if (response.data.success) {
              return axios(error.config); // 원 요청을 재실행
            }
          })
          .catch((error) => {
            console.error(error);
            // 리프레시 토큰 요청 실패 시 로그아웃 및 페이지 이동 처리
            window.location.href = "/";
          });
      }

      return Promise.reject(error);
    }
  );

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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
