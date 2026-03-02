import { render, screen, fireEvent } from "@testing-library/react";
import { FAQ } from "@/components/FAQ";
import { LanguageProvider } from "@/context/LanguageContext";

describe("FAQ", () => {
  it("renders questions and toggles answers", () => {
    render(
      <LanguageProvider>
        <FAQ />
      </LanguageProvider>
    );

    // Check first question
    const q1 = screen.getByText("¿Qué tan rápido pueden construir un MVP?");
    expect(q1).toBeInTheDocument();

    // Answer to Q1 should be visible
    const a1 = screen.getByText(/Dependiendo de la complejidad/i);
    expect(a1).toBeInTheDocument();

    // Click q2 to open it
    const q2 = screen.getByText("¿Solo trabajan con Blockchain y 3D?");
    fireEvent.click(q2);

    // Q2 answer becomes visible (testing presence in document)
    const a2 = screen.getByText(/Aunque son nuestras especialidades/i);
    expect(a2).toBeInTheDocument();
  });
});
