import { render, screen } from "@testing-library/react";
import App from "./App";

test("theme toggle button exists", () => {
  render(<App />);

  // Fails if the button is removed or renamed too much
  const toggleBtn = screen.getByRole("button", { name: /toggle/i });
  expect(toggleBtn).toBeInTheDocument();
});
