import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Board } from "./Board";

import { newBoardStatus } from "./getNewBoard";
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

const App = () => {
  const [state, setState] = useState({
    boardStatus: newBoardStatus(),
    generation: 0,
    isGameRunning: false,
    speed: 500
  });
  const [timerID, setTimerID] = useState(null);

  const handleStep = () => {
    const nextStep = () => {
      const boardStatus = state.boardStatus;
      const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus));
      const amountTrueNeighbors = (r, c) => {
        const neighbors = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, 1],
          [1, 1],
          [1, 0],
          [1, -1],
          [0, -1]
        ];
        return neighbors.reduce((trueNeighbors, neighbor) => {
          const x = r + neighbor[0];
          const y = c + neighbor[1];
          const isNeighborOnBoard = x >= 0 && x < ROWS && y >= 0 && y < COLOMS;
          /* No need to count more than 4 alive neighbors due to rules */
          if (trueNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
            return trueNeighbors + 1;
          } else {
            return trueNeighbors;
          }
        }, 0);
      };

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLOMS; c++) {
          const totalTrueNeighbors = amountTrueNeighbors(r, c);

          if (!boardStatus[r][c]) {
            if (totalTrueNeighbors === 3) clonedBoardStatus[r][c] = true;
          } else {
            if (totalTrueNeighbors < 2 || totalTrueNeighbors > 3)
              clonedBoardStatus[r][c] = false;
          }
        }
      }

      return clonedBoardStatus;
    };

    setState({
      ...state,
      boardStatus: nextStep(state.boardStatus),
      generation: state.generation + 1
    });
  };

  useEffect(() => {
    clearInterval(timerID);
    const _timerID = setInterval(() => {
      handleStep();
    }, 500);
    setTimerID(_timerID);
    return () => {};
  }, [state.isGameRunning, state.boardStatus]);

  return (
    <div>
      <Header>Game of life</Header>
      <Board boardStatus={state.boardStatus} />
      <GameStatus
        onClick={() => setState(!state.isGameRunning)}
        gameStatus={state.isGameRunning}
      >
        {(state.isGameRunning && "START") || "STOP"}
      </GameStatus>
    </div>
  );
};

export default App;
