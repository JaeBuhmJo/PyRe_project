import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function OAuth() {
  return (
    <Container className="sub-container">
      <Outlet />
    </Container>
  );
}

export default OAuth;
