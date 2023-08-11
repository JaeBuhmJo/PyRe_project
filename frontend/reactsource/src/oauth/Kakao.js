import axios from "axios";
import { useState } from "react";

function Kakao() {
  const [needRegister, setneedRegister] = useState(false);
  // redirect로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  function LoginFail() {
    alert("카카오 로그인 실패");
    window.location.href = "/users/login";
  }

  // 해당 code를 장고에 보내기
  function Authenticate() {
    axios
      .get("http://127.0.0.1:8000/oauth/kakao/token?code=" + code)
      .then((response) => {
        if (response.status !== 200) {
          LoginFail();
        }
        if (response.data === "Failed to get access token") {
          LoginFail();
        }
        if (response.data === "Register") {
          // 회원가입 처리 필요
          setneedRegister(true);
        }
        console.log(response);
      })
      .catch((error) => {
        alert(error);
        LoginFail();
      });
  }

  function Process() {
    return <div>{needRegister ? <h2>회원가입 페이지</h2> : <h1>로그인 요청 중입니다..</h1>}</div>;
  }

  return (
    <>
      <Process />
      <Authenticate />
    </>
  );
}

export default Kakao;
