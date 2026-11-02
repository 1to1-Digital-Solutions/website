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
  it("states the problem and offers the Hablemos CTA", () => {
    renderWithProviders(<Hero />);

    expect(screen.getByText(/no sabes ni por dónde empezar/i)).toBeInTheDocument();
    expect(screen.queryByText(/8 semanas/i)).toBeNull();

    expect(screen.getByRole("link", { name: /^Hablemos$/i })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: /Cómo trabajaremos/i })).toHaveAttribute(
      "href",
      "#process"
    );
  });
});
