import { screen } from "@testing-library/react";
import { Process } from "@/components/Process";
import { renderWithProviders } from "../test-utils";

describe("Process", () => {
  it("shows the plan with the price and a link to the detail on /services", () => {
    renderWithProviders(<Process />);

    expect(screen.getByText("2.500 €")).toBeInTheDocument();
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/services");
  });
});
