import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../AuthContext";

function Register() {
  const { setNickname } = useContext(AuthContext);
  const navigate = useNavigate();

  function PostNickName(event) {
    event.preventDefault();
    const nickname = document.querySelector("#id").value;
    const regex = /^[A-Za-z0-9가-힣]+$/; //한글, 영어, 숫자 여부 정규식

    if (!regex.test(nickname)) {
      alert("닉네임에 허용되지 않은 문자가 포함되었습니다.");
      return;
    }
    if (nickname.length > 10) {
      alert("닉네임 길이가 10자를 초과합니다");
      return;
    }
    axios
      .post("https://127.0.0.1:8000/users/nickname", { nickname: nickname })
      .then((response) => {
        if (response.data === "duplicate") {
          alert("동일한 닉네임이 존재합니다.");
          return;
        }
        if (response.data === "Success") {
          setNickname(nickname);
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        alert("닉네임 설정에 실패했습니다.");
        console.log(error);
      });
  }

  return (
    <>
      <h1>게임에서 사용할 닉네임을 입력해주세요</h1>
      <h3>한글, 영어, 숫자로 이루어진 10자 이내로 입력해주세요.</h3>

      <form action="" method="post" onSubmit={PostNickName}>
        <input type="text" name="" id="id" />
        <Button className="btn btn-success" type="submit">
          게임 시작하기
        </Button>
      </form>
    </>
  );
}

export default Register;
