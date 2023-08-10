import axios from "axios";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

function Auth() {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const kakaoRedirectURI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const CLIENT_SECRET = "[본인 CLIENT SECRET 값]";

  //응답 site 구분
  if (window.location.href.startsWith(kakaoRedirectURI)) {
  }

  // callback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  return (
    <>
      <h1>auth</h1>
    </>
  );
}

export default Auth;
