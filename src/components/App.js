import React, { useState } from "react";
import styled from "styled-components";
import { Board } from "./Board";
import { ROWS, COLOMS } from "../constants";
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
  width: 120px;
  height: 50px;
  font-size: 24px;
  background-color: black;
  color: white;
  position: absolute;
  top: 400px;
  right: 200px;
`;

function App() {
  const [gameStatus, setGameStatus] = useState(false);
  const newBoardStatus = (cellStatus = () => Math.random() < 0.25) => {
    const grid = [];
    for (let r = 0; r < ROWS; r++) {
      grid[r] = [];
      for (let c = 0; c < COLOMS; c++) {
        grid[r][c] = cellStatus();
      }
    }
    return grid;
  };
  return (
    <div>
      <Header>Game of life</Header>
      <Board gameStatus={gameStatus} boardStatus={newBoardStatus()} />
      <GameStatus
        onClick={() => setGameStatus(!gameStatus)}
        gameStatus={gameStatus}
      >
        {(gameStatus && "START") || "STOP"}
      </GameStatus>
    </div>
  );
}

export default App;
