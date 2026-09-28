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
    const q1 = screen.getByText("¿Cómo de rápido podemos construir un MVP?");
    expect(q1).toBeInTheDocument();

    // Answer to Q1 should be visible
    const a1 = screen.getByText(/Dependiendo de la complejidad/i);
    expect(a1).toBeInTheDocument();

    // Click q2 to open it
    const q2 = screen.getByText("¿Solo trabajáis con realidad mixta y Web3?");
    fireEvent.click(q2);

    // Q2 answer becomes visible (testing presence in document)
    const a2 = screen.getByText(/Son las tecnologías en las que estamos más metidos/i);
    expect(a2).toBeInTheDocument();
  });
});
