import React, { useState } from "react";
import styled from "styled-components";
import { Board } from "./Board";
const Header = styled.header`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GameStatus = styled.button`
  width: 90px;
  background-color: black;
  color: white;
`;

function App() {
  const [gameStatus, setGameStatus] = useState(false);
  return (
    <div>
      <Header>Game of life</Header>
      <Board />
      <GameStatus
        onClick={() => setGameStatus(!gameStatus)}
        gameStatus={gameStatus}
      />
    </div>
  );
}

export default App;
