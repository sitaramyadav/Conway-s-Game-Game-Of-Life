import React, { useState } from "react";
import styled from "styled-components";
import { Square } from "./Square";

const BoardStyle = styled.main`
  padding: 5px 5px;
  height: 820px;
  margin: auto;
  width: 820px;
  box-sizing: border-box;
  border: 5px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
`;

export const Board = ({ gameStatus }) => {
  const board = [];
  const isAlive = () => Math.random() > 0.7;

  const renderRow = () => {
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 40; j++) {
        board.push(<Square key={`${i},${j}`} isAlive={isAlive(i, j)} />);
      }
    }

    return board;
  };

  return <BoardStyle>{renderRow()}</BoardStyle>;
};
