import { screen } from "@testing-library/react";
import { Hero } from "@/components/Hero";
import { renderWithProviders } from "../test-utils";

// Mock the HeroCanvas which uses Three.js
jest.mock("@/components/canvas/HeroCanvas", () => {
  const MockHeroCanvas = () => <div data-testid="hero-canvas-mock">Canvas</div>;
  MockHeroCanvas.displayName = "MockHeroCanvas";
  return { HeroCanvas: MockHeroCanvas };
});

// Mock the mobile background (also touches client-only APIs)
jest.mock("@/components/HeroMobileBackground", () => {
  const MockMobileBg = () => <div data-testid="hero-mobile-bg-mock" />;
  MockMobileBg.displayName = "MockMobileBg";
  return { HeroMobileBackground: MockMobileBg };
});

describe("Hero", () => {
  it("renders title and buttons", () => {
    renderWithProviders(<Hero />);

    expect(screen.getByText(/mentoría de 8 semanas/i)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Escríbeme/i })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: /Cómo trabajaremos/i })).toHaveAttribute(
      "href",
      "#process"
    );
  });
});
