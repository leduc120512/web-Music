import { render, screen } from "@testing-library/react";
import App from "./App";

// Keep App test lightweight by avoiding async side effects from full layout.
jest.mock("./compodens/Layout/DefaultLayout", () => () => (
  <div>Mock Default Layout</div>
));

let warnSpy;

beforeEach(() => {
  warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  warnSpy.mockRestore();
});

test("renders default route content", () => {
  render(<App />);
  expect(screen.getByText(/mock default layout/i)).toBeInTheDocument();
});
