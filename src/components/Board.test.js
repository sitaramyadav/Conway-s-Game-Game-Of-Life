import React from "react";
import { Board } from "./Board";
import { render } from "@testing-library/react";

describe("Board", () => {
  it("should render the grid", () => {
    const { queryByTestId } = render(<Board />);
    expect(queryByTestId("Board")).toBeInTheDocument();
    expect(queryByTestId).toMatchSnapshot();
  });
});

describe("Board", () => {
  it("should be configurable with giveng row and colom ", () => {
    const board = new Board(40, 60);

    expect(board.length).toBe(40);
    expect(board[0].length).toBe(60);
  });

  it("should have nextGeneration method which return next generation alive and dead cell", () => {
    const board = new Board(4, 4);
    board.nextGeneration();
  });
});
