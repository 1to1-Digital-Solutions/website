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
    const q1 = screen.getByText("¿Necesito algún conocimiento previo de IA?");
    expect(q1).toBeInTheDocument();

    // Six questions, as native <details>; the first one starts open
    const items = document.querySelectorAll("details");
    expect(items).toHaveLength(6);
    expect(items[0]).toHaveAttribute("open");
    const a1 = screen.getByText(/Partimos de cero/i);
    expect(a1).toBeInTheDocument();

    // Click q2 to open it
    const q2 = screen.getByText("¿Las sesiones son online?");
    fireEvent.click(q2);

    // Q2 answer is there and its item opens
    const a2 = screen.getByText(/Todas las sesiones son online, por videollamada/i);
    expect(a2).toBeInTheDocument();
    expect(items[1]).toHaveAttribute("open");
  });
});
