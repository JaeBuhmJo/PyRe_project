import { Outlet } from "react-router-dom";

function OAuth() {
  return (
    <>
      <h1>로그인 요청중입니다..</h1>
      <Outlet />
    </>
  );
}

export default OAuth;
