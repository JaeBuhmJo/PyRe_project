import axios from "axios";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

function Auth() {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const kakaoRedirectURI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const CLIENT_SECRET = "[본인 CLIENT SECRET 값]";

  // callback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  function loginFail() {
    alert("카카오 로그인 실패");
    window.location.href = "/users/login";
  }

  // 해당 code를 장고에 보내기
  axios
    .get("http://127.0.0.1:8000/oauth/kakao/callback/token?code=" + code)
    .then((response) => {
      if (response.status != 200) {
        loginFail();
      }
      if (response.data === "Failed to get access token") {
        loginFail();
      }
      console.log(response);
    })
    .catch((error) => {
      alert(error);
      loginFail();
    });

  return (
    <>
      <h1>Kakao REST API</h1>
    </>
  );
}

export default Auth;
