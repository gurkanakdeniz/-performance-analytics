import { render, screen } from "@testing-library/react";
import DashboardLineChart from "./DashboardLineChart";

test("renders learn react link", () => {
  render(<DashboardLineChart />);
  const linkElement = screen.getByText(/app/i);
  expect(linkElement).toBeInTheDocument();
});
