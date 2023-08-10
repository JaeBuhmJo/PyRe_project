import { Outlet } from "react-router-dom";

function Users() {
  return (
    <>
      <h1>유저 페이지</h1>
      <Outlet />
    </>
  );
}

export default Users;
