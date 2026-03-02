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

    expect(screen.getByText("Sarah Jenkins")).toBeInTheDocument();
    expect(screen.getByText("Marcus Chen")).toBeInTheDocument();
    expect(screen.getByText("David Elson")).toBeInTheDocument();
  });
});
