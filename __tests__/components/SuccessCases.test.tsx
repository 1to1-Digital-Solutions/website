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
    expect(screen.getByText("destacados.")).toBeInTheDocument();

    // Specific projects (titles, headings)
    expect(screen.getByRole("heading", { name: /Firefly/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Numen Games/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Moovle/i })).toBeInTheDocument();
  });
});
