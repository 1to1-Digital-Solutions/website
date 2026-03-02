import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/Hero";
import { LanguageProvider } from "@/context/LanguageContext";

// Mock the HeroCanvas which uses Three.js
jest.mock("@/components/canvas/HeroCanvas", () => {
  return {
    HeroCanvas: () => <div data-testid="hero-canvas-mock">Canvas</div>,
  };
});

describe("Hero", () => {
  it("renders title and buttons", () => {
    render(
      <LanguageProvider>
        <Hero />
      </LanguageProvider>
    );

    // Check for the sub text from translations
    expect(screen.getByText(/Soluciones Premium de Blockchain/i)).toBeInTheDocument();

    // Check for the link buttons
    expect(screen.getByRole("link", { name: /Inicia tu Proyecto/i })).toHaveAttribute(
      "href",
      "#contact"
    );
    expect(screen.getByRole("link", { name: /Ver Nuestro Trabajo/i })).toHaveAttribute(
      "href",
      "#work"
    );
  });
});
