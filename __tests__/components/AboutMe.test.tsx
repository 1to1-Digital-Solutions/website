import { render, screen } from "@testing-library/react";
import { AboutMe } from "@/components/AboutMe";
import { LanguageProvider } from "@/context/LanguageContext";

describe("AboutMe", () => {
  it("renders content correctly", () => {
    render(
      <LanguageProvider>
        <AboutMe />
      </LanguageProvider>
    );

    expect(screen.getByText("¿Quién está")).toBeInTheDocument();
    expect(screen.getByText("Detrás?")).toBeInTheDocument();
    expect(screen.getByText(/soy el fundador de 1to1 Studio/i)).toBeInTheDocument();
  });
});
