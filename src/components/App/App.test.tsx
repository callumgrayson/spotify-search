import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app title", () => {
  render(<App />);
  const linkElement = screen.getByText(/spotify search/i);
  expect(linkElement).toBeInTheDocument();
});
