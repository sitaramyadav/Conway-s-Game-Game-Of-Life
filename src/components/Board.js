import React from "react";
import styled from "styled-components";
import { Square } from "./Square";

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
`;

export const Board = ({ rows, coloms, presentGeneration }) => {
  const renderRow = (tr = []) => {
    if (presentGeneration && presentGeneration[0]) {
      for (let row = 0; row < rows; row++) {
        const td = [];
        for (let colom = 0; colom < coloms; colom++) {
          // if (presentGeneration[row] && presentGeneration[row][colom])
          td.push(
            <Square
              key={`${row},${colom}`}
              isAlive={presentGeneration[row][colom]}
            />
          );
        }
        tr.push(<tr key={row}>{td}</tr>);
      }
    }
    return (
      <table>
        <tbody>{tr}</tbody>
      </table>
    );
  };

  return <BoardStyle data-testid={"Board"}>{renderRow()}</BoardStyle>;
};
