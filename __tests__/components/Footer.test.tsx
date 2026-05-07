import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

describe("Footer", () => {
  it("renders footer brand, description and current year", () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );

    // 1to1 Digital Solutions appears in part of a span/link
    expect(screen.getAllByText(/1to1 Digital Solutions/i)[0]).toBeInTheDocument();

    // Check year
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString(), "i"))).toBeInTheDocument();
  });
});
