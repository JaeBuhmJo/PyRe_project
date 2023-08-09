import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Main";
import OnetoFifty from "./games/OnetoFifty";
import VsOmok from "./games/VsOmok";

function App() {
  // 경로 설정
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        // { path: "/", element: <GameList /> },
        { path: "/vsomok", element: <VsOmok /> },
        { path: "/onetofifty", element: <OnetoFifty /> },
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
