import { screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";
import { renderWithProviders } from "../test-utils";

describe("Footer", () => {
  it("renders footer brand, description and current year", () => {
    renderWithProviders(<Footer />);

    // Brand appears both as an image alt (top) and as visible text in the copyright line.
    expect(screen.getByAltText(/1to1 Digital Solutions/i)).toBeInTheDocument();
    expect(screen.getByText(/1to1 Digital Solutions/i)).toBeInTheDocument();

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString(), "i"))).toBeInTheDocument();
  });
});
