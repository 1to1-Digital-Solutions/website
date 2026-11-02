import { screen } from "@testing-library/react";
import { Hero } from "@/components/Hero";
import { renderWithProviders } from "../test-utils";

// Mock the point cloud, which needs WebGL.
jest.mock("@/components/canvas/HeroParticles", () => {
  const MockHeroParticles = () => <div data-testid="hero-particles-mock" />;
  MockHeroParticles.displayName = "MockHeroParticles";
  return { HeroParticles: MockHeroParticles };
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
