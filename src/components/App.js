import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Board } from "./Board";
import { getFutuerGeneration } from "./nextStep";

import { newBoardStatus } from "./getNewBoard";

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
  right: 50px;
`;
const Generation = styled.p`
  position: absolute;
  top: 320px;
  right: 32px;
  font-size: 20px;
  font-weight: bold;
`;

const App = () => {
  const [state, setState] = useState({
    boardStatus: newBoardStatus(),
    generation: 0,
    isGameRunning: false,
    speed: 500
  });
  const [timerID, setTimerID] = useState(null);

  const handleFutureGeneration = () => {
    setState({
      ...state,
      boardStatus: getFutuerGeneration(state.boardStatus),
      generation: state.generation + 1
    });
  };

  useEffect(() => {
    clearInterval(timerID);
    const _timerID = setInterval(() => {
      handleFutureGeneration();
    }, 500);
    setTimerID(_timerID);
    return () => {};
  }, [state.isGameRunning, state.boardStatus]);

  return (
    <div data-testid={"App"}>
      <Header>Game of life</Header>
      <Board boardStatus={state.boardStatus} />
      <GameStatus
        onClick={() => setState(!state.isGameRunning)}
        gameStatus={state.isGameRunning}
      >
        {(state.isGameRunning && "START") || "STOP"}
      </GameStatus>
      <Generation>Generation: {state.generation}</Generation>
    </div>
  );
};

export default App;
