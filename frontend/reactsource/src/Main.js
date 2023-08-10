import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <Container>
      <NavigationBar />
      <Outlet />
      <Footer />
    </Container>
  );
}

function NavigationBar() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src="/img/just10min.png" alt="" />
          10분만
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/games/onetofifty">1to50</Nav.Link>
            <Nav.Link href="/games/vsomok">온라인 오목</Nav.Link>
            <Nav.Link href="/">1인 오목</Nav.Link>
          </Nav>
          <NavDropdown className="justify-content-end" title="로그인" id="basic-nav-dropdown">
            <NavDropdown.Item href="/users/login">프로필 보기</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">회원 정보 변경</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">로그아웃</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Footer() {
  return (
    <>
      <a href="https://www.flaticon.com/kr/free-icons/-" title="분할 된 원형 화살표 아이콘" target="_blank">
        분할 된 원형 화살표 아이콘 제작자: Freepik - Flaticon
      </a>
    </>
  );
}

export default Main;
