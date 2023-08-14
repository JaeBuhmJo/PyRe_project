import axios from "axios";
import { useNavigate } from "react-router-dom";

function Kakao() {
  // redirect로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  function LoginFail() {
    alert("카카오 로그인 실패");
    window.location.href = "/users/login";
  }

  function PostJWT(id) {
    axios
      .post(
        "https://127.0.0.1:8000/api/token",
        {
          username: id,
          password: "no",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  }

  // 해당 code를 장고에 보내기
  function Authenticate() {
    axios
      .post("https://127.0.0.1:8000/oauth/kakao/token", { code: code })
      .then((response) => {
        if (response.status !== 200) {
          LoginFail();
        }
        if (response.data === "Failed to get access token") {
          LoginFail();
        }
        return response;
      })
      .then((response) => {
        PostJWT(response.data);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        alert(error);
        LoginFail();
      });
  }

  return (
    <>
      <h1>로그인 요청 중입니다..</h1>
      <Authenticate />
    </>
  );
}

export default Kakao;
