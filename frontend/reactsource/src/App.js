import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Main";
import OnetoFifty from "./games/OnetoFifty";
import VsOmok from "./games/VsOmok";
import Login from "./users/Login";
import Kakao from "./oauth/Kakao";
import OAuth from "./oauth/OAuth";
import Users from "./users/Users";

function App() {
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
        { path: "users", element: <Users />, children: [{ path: "login", element: <Login /> }] },
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
