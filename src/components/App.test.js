import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
// import "@testing-library/jest-dom/extend-expect";

describe("App", () => {
  it("should render the child components", () => {
    const { queryByTestId } = render(<App />);

    expect(queryByTestId("App")).toBeInTheDocument();
  });
});
