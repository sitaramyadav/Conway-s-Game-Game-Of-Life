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
