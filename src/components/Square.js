import React from "react";
import styled, { css } from "styled-components";

export const Square = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid black;
  box-sizing: border-box;

  background-color: ${props => (props.isAlive ? "black" : "white")};
`;
