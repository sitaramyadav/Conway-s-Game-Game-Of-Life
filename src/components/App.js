import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Board } from "./Board";
import Input from "./common/Input";
import { getFutuerGeneration } from "./calculateFuture";
import { getFirstGeneration } from "./firstGeneration";
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
  font-size: 24px;
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
  cursor: pointer;
`;
const Generation = styled.p`
  position: absolute;
  top: 320px;
  right: 184px;
  font-size: 20px;
  font-weight: bold;
`;

const App = () => {
  const [state, setState] = useState({
    presentGeneration: getFirstGeneration(),
    generationCount: 0,
    isGameRunning: false,
    speed: 500,
    rows: ROWS,
    coloms: COLOMS
  });

  const [timerID, setTimerID] = useState(null);

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleFutureGeneration = () => {
    setState({
      ...state,
      presentGeneration: getFutuerGeneration(state.presentGeneration),
      generationCount: state.generationCount + 1
    });
  };

  useEffect(() => {
    if (state.isGameRunning) {
      const _timerID = setInterval(() => {
        handleFutureGeneration();
      }, 500);
      setTimerID(_timerID);
    }

    return () => {
      clearInterval(timerID);
    };
  }, [state.isGameRunning, state.presentGeneration]);

  useEffect(() => {
    if (!state.isGameRunning) {
      handleFutureGeneration();
    }
    return () => {
      clearInterval(timerID);
    };
  }, [state.isGameRunning]);

  return (
    <div data-testid={"App"}>
      <Header>
        <h1>Game of life</h1>
      </Header>
      <Input
        type="number"
        name="rows"
        label="Rows"
        placeholder="Rows"
        onChange={handleChange}
        value={state.rows}
      />
      <Input
        type="number"
        name="coloms"
        label="Colums"
        placeholder="Colums"
        value={state.coloms}
        onChange={handleChange}
      />
      <Board
        rows={state.rows}
        coloms={state.coloms}
        presentGeneration={state.presentGeneration}
      />
      <GameStatus
        onClick={() =>
          setState({ ...state, isGameRunning: !state.isGameRunning })
        }
        gameStatus={state.isGameRunning}
      >
        {state.isGameRunning ? "Pause" : "Presume"}
      </GameStatus>
      <Generation>Generation: {state.generationCount}</Generation>
    </div>
  );
};

export default App;
