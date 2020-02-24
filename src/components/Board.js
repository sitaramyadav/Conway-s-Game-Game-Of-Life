import React from "react";
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

export const Board = () => {
  const isEven = number => {
    return number % 2 === 0;
  };
  const row = [];

  const renderRow = () => {
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 40; j++) {
        if (isEven(i) && isEven(j)) {
          //Todo: isEven needs to be converted into is isAlive;
          row.push(<Square key={`${i},${j}`} color="black" />);
        } else {
          row.push(<Square key={`${i},${j}`} />);
        }
      }
    }

    return row;
  };

  return <BoardStyle>{renderRow()}</BoardStyle>;
};
