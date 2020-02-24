import React from "react";
import styled, { css } from "styled-components";

const SquareStyle = styled.div`
  width: 20px;
  height: 20px;
  background-color: white;
  ${props =>
    props.color === "black" &&
    css`
      background-color: black;
    `}
`;

export const Square = ({ color }) => {
  return <SquareStyle color={color} />;
};
