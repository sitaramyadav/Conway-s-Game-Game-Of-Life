import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Square } from "./Square";
import { ROWS, COLOMS } from "../constants";

const BoardStyle = styled.main`
  padding: 5px 5px;
  height: 900px;
  margin: auto;
  width: 900px;
  box-sizing: border-box;
  border: 5px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  // flex-wrap: wrap;
  box-sizing: border-box;
`;

export const Board = ({ gameStatus, boardStatus }) => {
  const isAlive = () => Math.random() > 0.7;
  const [tr, setTr] = useState([]);
  console.log(gameStatus, "gameStatus");

  const handleStart = () => {
    const newBoardStatus = JSON.parse(JSON.stringify(boardStatus));
    // setInterval(() => {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLOMS; c++) {
        let trueNeighbors = 0;
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
        neighbors.forEach(neighbor => {
          const x = r + neighbor[0];
          const y = c + neighbor[1];
          const isNeighborOnBoard = x >= 0 && x < ROWS && y >= 0 && y < COLOMS;
          /* No need to count more than 4 alive neighbors */
          if (trueNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
            trueNeighbors++;
          }
        });
        if (!boardStatus[r][c]) {
          if (trueNeighbors === 3) newBoardStatus[r][c] = true;
        } else {
          if (trueNeighbors < 2 || trueNeighbors > 3)
            newBoardStatus[r][c] = false;
        }
      }
    }
    // }, 1000);
    return newBoardStatus;
  };
  useEffect(() => {
    if (gameStatus) {
      setInterval(() => {
        setTr(handleStart);
      }, 1000);
    }

    return () => {};
  }, [gameStatus, boardStatus]);

  const renderRow = (tr = []) => {
    for (let row = 0; row < ROWS; row++) {
      const td = [];
      for (let colom = 0; colom < COLOMS; colom++) {
        td.push(<Square key={`${row},${colom}`} isAlive={isAlive()} />);
      }
      tr.push(<tr key={row}>{td}</tr>);
    }
    return (
      <table>
        <tbody>{tr}</tbody>
      </table>
    );
  };

  return <BoardStyle>{renderRow()}</BoardStyle>;
};
