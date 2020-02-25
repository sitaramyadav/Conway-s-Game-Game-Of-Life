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

export const Board = ({ boardStatus }) => {
  console.log(boardStatus, "boardStatus");
  const renderRow = (tr = []) => {
    for (let row = 0; row < ROWS; row++) {
      const td = [];
      for (let colom = 0; colom < COLOMS; colom++) {
        td.push(
          <Square key={`${row},${colom}`} isAlive={boardStatus[row][colom]} />
        );
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