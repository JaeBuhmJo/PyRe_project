import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function Users() {
  return (
    <Container className="sub-container">
      <Outlet />
    </Container>
  );
}

export default Users;
