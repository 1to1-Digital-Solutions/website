import { render, screen } from "@testing-library/react";
import { Services } from "@/components/Services";
import { LanguageProvider } from "@/context/LanguageContext";

describe("Services", () => {
  it("renders section title and all cards", () => {
    render(
      <LanguageProvider>
        <Services />
      </LanguageProvider>
    );

    // Title
    expect(screen.getByText("Lo Que")).toBeInTheDocument();
    expect(screen.getByText("Hacemos.")).toBeInTheDocument();

    // Cards
    expect(screen.getByText("Desarrollo de MVP")).toBeInTheDocument();
    expect(screen.getByText("Integración Blockchain")).toBeInTheDocument();
    expect(screen.getByText("Realidad Mixta y 3D")).toBeInTheDocument();
    expect(screen.getByText("Rescate Técnico (Tech Rescue)")).toBeInTheDocument();
  });
});
