import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}

function NavigationBar() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">PyRe</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/onetofifty">1to50</Nav.Link>
            <Nav.Link href="/vsomok">온라인 오목</Nav.Link>
            <Nav.Link href="/">1인 오목</Nav.Link>
          </Nav>
          <NavDropdown className="justify-content-end" title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">프로필 보기</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">회원 정보 변경</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">로그아웃</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Main;
