import React from "react";
import styled from "styled-components";
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

function App() {
  return <Header>Game of life</Header>;
}

export default App;
