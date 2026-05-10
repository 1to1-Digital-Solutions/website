import { render, screen } from "@testing-library/react";
import { Testimonials } from "@/components/Testimonials";
import { LanguageProvider } from "@/context/LanguageContext";

describe("Testimonials", () => {
  it("renders testimonials correctly", () => {
    render(
      <LanguageProvider>
        <Testimonials />
      </LanguageProvider>
    );

    expect(screen.getByText("David Torrico")).toBeInTheDocument();
    expect(screen.getByText("Pedro Casado")).toBeInTheDocument();
  });
});
