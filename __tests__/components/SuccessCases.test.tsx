import { render, screen } from "@testing-library/react";
import { SuccessCases } from "@/components/SuccessCases";
import { LanguageProvider } from "@/context/LanguageContext";

describe("SuccessCases", () => {
  it("renders section title and project cards", () => {
    render(
      <LanguageProvider>
        <SuccessCases />
      </LanguageProvider>
    );

    // Title
    expect(screen.getByText("Proyectos")).toBeInTheDocument();
    expect(screen.getByText("Destacados.")).toBeInTheDocument();

    // Specific projects
    expect(screen.getByText("Dashboard Analítico DeFi")).toBeInTheDocument();
    expect(screen.getByText("Galería de Arte Virtual")).toBeInTheDocument();
    expect(screen.getByText("SaaS Launchpad")).toBeInTheDocument();
  });
});
