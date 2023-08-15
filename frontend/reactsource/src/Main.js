import { useContext, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import axios from "axios";

function Main() {
  const { accessToken, setAccessToken, isLoggedIn, setIsLoggedIn, nickname, setNickname, refreshed, setRefreshed, csrf, setCsrf } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    RequestNewCsrfToken();
    VerifyAccessToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      RequestNickname();
    }
  }, [accessToken]);

  useEffect(() => {
    if (nickname === "None") {
      navigate("/users/register");
    }
  }, [nickname]);

  function RequestNickname() {
    axios
      .get("https://127.0.0.1:8000/users/nickname")
      .then((response) => {
        if (nickname !== response.data) setNickname(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function RequestNewCsrfToken() {
    axios
      .get("https://127.0.0.1:8000/csrf/token")
      .then((response) => {
        setCsrf(true);
      })
      .catch((error) => {
        console.error("Error getting new CSRF token:", error);
      });
  }

  function VerifyAccessToken() {
    const tokenFromCookie = getCookie("access_token");
    if (tokenFromCookie) {
      setIsLoggedIn(true);
      setAccessToken(tokenFromCookie);
      axios.defaults.headers.common["Authorization"] = `Bearer ${tokenFromCookie}`;
    } else {
      RefreshAccessToken();
    }
  }

  function RefreshAccessToken() {
    axios
      .post("https://127.0.0.1:8000/jwt/token/refresh")
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          setAccessToken(response.data.access_token);
          setRefreshed(true);
          axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
        }
      })
      .catch((error) => {
        if (isLoggedIn) {
          Logout();
        }
      });
  }

  function Logout() {
    axios
      .post("https://127.0.0.1:8000/users/logout")
      .then((response) => {
        // 로컬 변수에서 토큰값 초기화, 로그아웃 처리
        setAccessToken("");
        setNickname(null);
        setIsLoggedIn(false);
        // axios 헤더에서 Authorization 제거
        delete axios.defaults.headers.common["Authorization"];
        navigate("/", { replace: true });
      })
      .catch((error) => console.error(error));
  }

  // 쿠키에서 특정 키의 값을 얻는 함수
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }

  return (
    <>
      <Container className="main-container">
        <NavigationBar />
        <States />
        <Outlet />
      </Container>
      <Footer />
    </>
  );

  function States() {
    return (
      <Container className="state-container">
        <div className="rounded-box">
          <span className="title">
            <h3>보안 요소</h3>
          </span>
          <div className="status-elements-grid">
            <h3>사용자 상태 : {isLoggedIn ? "로그인" : "로그아웃"}</h3>
            <h3>JWT Access 토큰 : {accessToken ? "활성화" : "-"}</h3>
            <h3>csrf 토큰 : {csrf ? "활성화" : "-"}</h3>
            <h3>JWT Access Refresh : {refreshed ? "요청 전송" : "-"}</h3>
          </div>
        </div>
      </Container>
    );
  }

  function NavigationBar() {
    return (
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <Logo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <NavbarMenus />
        </Container>
      </Navbar>
    );
  }

  function NavbarMenus() {
    if (!isLoggedIn) {
      return (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <LogInButton />
        </Navbar.Collapse>
      );
    } else {
      return (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/games/onetofifty">1to50</Nav.Link> */}
            <Nav.Link href="/games/vsomok">오목</Nav.Link>
            {/* <Nav.Link href="/">1인 오목</Nav.Link> */}
          </Nav>
          <LogInButton />
        </Navbar.Collapse>
      );
    }
  }

  //온클릭 함수로 로그아웃 따로 구현해야겠는데
  function LogInButton() {
    if (!isLoggedIn) {
      return <Nav.Link href="/users/login">로그인</Nav.Link>;
    }

    return (
      <>
        <span className="mx-2">
          <Nav.Link href="/users/register">{nickname}님</Nav.Link>
        </span>
        <span className="mx-2">
          <Nav.Link href="#" onClick={Logout}>
            로그아웃
          </Nav.Link>
        </span>
      </>
    );
  }

  function Logo() {
    return (
      <>
        <b>안전한</b>
        <img src="/img/safe_playground.png" alt="" />
        <b>놀이터</b>
      </>
    );
  }

  function Footer() {
    return (
      <footer className="footer">
        <a href="https://www.flaticon.com/kr/free-icons/" title="방패 아이콘" target="_blank" rel="noreferrer">
          방패 아이콘 제작자: Smashicons - Flaticon
        </a>
      </footer>
    );
  }
}

export default Main;
