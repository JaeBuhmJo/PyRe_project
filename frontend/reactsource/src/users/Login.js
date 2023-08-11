import { Button, Container } from "react-bootstrap";

function Login() {
  return (
    <Container>
      <h1>Login</h1>
      <KakaoLogin />
      <GoogleLogin />
    </Container>
  );
}

function KakaoLogin() {
  let kakaoParams = {
    client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
    redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    response_type: "code",
  };
  kakaoParams = new URLSearchParams(kakaoParams).toString();

  return (
    <div className="mt-3">
      <Button variant="link" href={"https://kauth.kakao.com/oauth/authorize?" + kakaoParams}>
        <img src="/img/kakao_login_medium_narrow.png" alt="" />
      </Button>
    </div>
  );
}

function GoogleLogin() {
  return (
    <div className="mt-3">
      <Button variant="link">
        <img src="/img/btn_google_signin_dark_focus_web.png" alt="" />
      </Button>
    </div>
  );
}
export default Login;
