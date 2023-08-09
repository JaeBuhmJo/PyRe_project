import "./OnetoFifty.css";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

function Onetofifty() {
  //초기 조건 생성
  const [numbers, setnumbers] = useState(initNumbers());
  const [target, settarget] = useState(1);
  const [next, setnext] = useState(26);

  const userClick = (number) => {
    if (number !== target) {
      return;
    }
    console.log("correct");

    const index = numbers.findIndex((line) => line.findIndex((number) => number == target));
    let newNumbers = [...numbers];
    newNumbers[index] = next;

    settarget(target + 1);
    setnext(next + 1);
    setnumbers(newNumbers);
  };

  useEffect(() => {
    console.log(target, next);
    console.log("mount");

    return () => {
      console.log("unmount");
    };
  }, [numbers]);

  return (
    <Container>
      <Table className="gameBoard mt-3">
        <tbody>
          <tr>
            {numbers.map((row, rowIdx) => (
              <td key={rowIdx}>
                {row.map((number) => (
                  <Button key={number} className="gameButton" variant="primary" onClick={() => userClick(number)}>
                    {number}
                  </Button>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

function initNumbers() {
  let numbersInit = [[], [], [], [], []];
  for (let i = 1; i <= 25; i++) {
    numbersInit[Math.floor((i - 1) / 5)].push(i);
  }
  return numbersInit;
}

export default Onetofifty;
