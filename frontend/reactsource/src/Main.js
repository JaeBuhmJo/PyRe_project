import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function Main() {
  function CheckRegistered() {
    // 사용자의 정보를 불러와서 닉네임이 없으면 닉네임 등록 페이지로 이동.
  }

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
          <b>안전한</b>
          <img src="/img/safe_playground.png" alt="" />
          <b>놀이터</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/games/onetofifty">1to50</Nav.Link>
            <Nav.Link href="/games/vsomok">온라인 오목</Nav.Link>
            <Nav.Link href="/">1인 오목</Nav.Link>
          </Nav>
          <Nav.Link href="/users/login">로그인</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Footer() {
  return (
    <>
      <a href="https://www.flaticon.com/kr/free-icons/" title="방패 아이콘">
        방패 아이콘 제작자: Smashicons - Flaticon
      </a>
    </>
  );
}

export default Main;
