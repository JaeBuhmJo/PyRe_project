import { Button, Card, Container, Stack } from "react-bootstrap";
import "./VsOmok.css";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import placeStoneSound from "./../sounds/place_stone.mp3";

function VsOmok() {
  const cellSize = 44;
  const [play] = useSound(placeStoneSound);

  const [user1, setUser1] = useState({});
  const [user2, setUser2] = useState({});
  const [board, setBoard] = useState(getEmptyBoard());
  const [isBlack, setisBlack] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: -8000, y: -8000 });

  useEffect(() => {
    console.log("user 입장");

    return () => {
      console.log("unmount");
    };
  }, [user1, user2]);

  function getEmptyBoard() {
    let boardInit = [];
    for (let i = 0; i < 19; i++) {
      let row = [];
      for (let j = 0; j < 19; j++) {
        row.push(0);
      }
      boardInit.push(row);
    }
    return boardInit;
  }

  function BoardClick(event) {
    //유저의 착수 요청이 있을 경우 좌표를 얻어낸다
    const rect = document.querySelector(".omokBoard").getBoundingClientRect();
    const x = event.clientX - rect.left + 22;
    const y = event.clientY - rect.top + 22;
    const row = Math.round(y / cellSize) - 1;
    const col = Math.round(x / cellSize) - 1;

    if (row < 0 || row > 18 || col < 0 || col > 18 || board[row][col] > 0) {
      //돌이 이미 놓여 있거나 클릭이 영역을 벗어난 경우 리턴
      return;
    }
    PlaceStone({ row, col, isBlack });
  }

  function BoardMouseMove(event) {
    //유저의 착수 예정 지점을 표시
    const rect = document.querySelector(".omokBoard").getBoundingClientRect();
    const x = event.clientX - rect.left + 22;
    const y = event.clientY - rect.top + 22;
    const row = Math.round(y / cellSize) - 1;
    const col = Math.round(x / cellSize) - 1;

    if (row < 0 || row > 18 || col < 0 || col > 18 || board[row][col] > 0) {
      //돌이 이미 놓여있거나 커서가 영역을 벗어난 경우 미표시
      setMousePosition({ x: -8000, y: -8000 });
      return;
    }
    if (row * cellSize + 3 !== mousePosition.x || col * cellSize + 3 !== mousePosition.y) {
      setMousePosition({ x: row * cellSize + 3, y: col * cellSize + 3 });
    }
  }

  function PlaceStone({ row, col, isBlack }) {
    //놓으려는 수가 승리수인지, 33수인지 우선 판별
    let isVictory = false;
    let is33 = false;
    checkPlace();
    function checkPlace() {
      const player = isBlack ? 1 : 2;
      const directions = [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: -1 },
      ];

      let openThrees = 0;

      directions.forEach((direction) => {
        let line = "";
        for (let i = -5; i <= 5; i++) {
          const newRow = row + i * direction.y;
          const newCol = col + i * direction.x;

          if (i === 0) {
            line += "1";
            continue;
          }
          if (newRow < 0 || newRow >= 19 || newCol < 0 || newCol >= 19) {
            line += "-"; // <-- 벽을 의미하는 문자
          } else {
            line += board[newRow][newCol] === player ? "1" : board[newRow][newCol] === 0 ? "0" : "-";
          }
        }

        // 승리 4가지 패턴 - 육목 제외
        const regexPatternsVic = [/0111110/, /-111110/, /011111-/, /-11111-/];

        // 활삼 7가지 패턴 - 다음 차례에 필히 열린4가 나오는 경우
        const regexPatterns33 = [/0011100/, /001110-/, /-011100/, /0010110/, /0011010/, /0101100/, /0110100/];

        for (const regex of regexPatternsVic) {
          if (regex.test(line)) {
            isVictory = true;
            break;
          }
        }

        if (!isVictory) {
          for (const regex of regexPatterns33) {
            if (regex.test(line)) {
              openThrees++;
              break;
            }
          }
        }
      });

      if (openThrees >= 2) {
        is33 = true;
      }
    }

    if (is33) {
      alert("삼삼입니다. 다른 위치에 착수해주세요.");
      return;
    }

    //그 외 착수. setBoard
    let newBoard = board.map((row) => row.slice());
    newBoard[row][col] = isBlack ? 1 : 2;
    setisBlack(!isBlack);
    setBoard(newBoard);
    setMousePosition({ x: -8000, y: -8000 });
    play();
    if (isVictory) {
      alert((isBlack ? "흑" : "백") + "의 승리입니다. 축하드립니다.");
      setBoard(getEmptyBoard());
      setisBlack(true);
    }
  }

  function Stones() {
    return (
      <>
        {board.map((row, x) => (
          <div key={x}>
            {row.map((val, y) => {
              if (val === 0) {
                return;
              }
              return <div key={y} className={val === 1 ? "stone blackStone" : "stone whiteStone"} style={{ left: y * cellSize + 3, top: x * cellSize + 3 }} />;
            })}
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <Container className="sub-container" onContextMenu={preventContextMenu}>
        <h3 className="mt-2">
          <b>온라인 오목</b>
        </h3>
        {/* <Stack direction="horizontal" gap={3}> */}
        <div className="omokBoard mt-3" onClick={BoardClick} onMouseMove={BoardMouseMove}>
          <Stones />
          <div className={isBlack ? "stone blackStone transparent" : "stone whiteStone transparent"} style={{ left: mousePosition.y, top: mousePosition.x }} />
        </div>
        {/* <div gap={3}>
            <UserCard user={user1} />
            <UserCard user={user2} />
          </div>
        </Stack> */}
      </Container>
      <Footer />
    </>
  );
}

const UserCard = ({ user }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="./logo192.png" />
      <Card.Body>
        <Card.Title>사용자 ID</Card.Title>
        <Card.Text>전적을 표기할까</Card.Text>
        <Button variant="primary">전적 보기</Button>
      </Card.Body>
    </Card>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        바둑판 이미지 출처 :
        <span>
          <a href="https://commons.wikimedia.org/wiki/File:Blank_Go_board.png" target="_blank" rel="noreferrer">
            Dbenbenn, Public domain, via Wikimedia Commons
          </a>
        </span>
      </p>
      <p>
        흰 바둑돌 이미지 출처 :
        <span>
          <a href="https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%9D%BC:Go_w_no_bg.svg" target="_blank" rel="noreferrer">
            Micheletb, CC BY-SA 3.0, via Creative Commons
          </a>
        </span>
      </p>
      <p>
        검은 바둑돌 이미지 출처 :
        <span>
          <a href="https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%9D%BC:Go_b_no_bg.svg" target="_blank" rel="noreferrer">
            Micheletb, CC BY-SA 3.0, via Creative Commons
          </a>
        </span>
      </p>
      <p>
        바둑돌 착수음 출처 :
        <span>
          <a href="https://soundbible.com/1442-Cupboard-Door-Close.html#" target="_blank" rel="noreferrer">
            Caroline Ford, Attribution 3.0, via Creative Commons
          </a>
        </span>
      </p>
    </footer>
  );
};

function preventContextMenu(event) {
  event.preventDefault();
}

export default VsOmok;
