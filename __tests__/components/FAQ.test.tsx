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
    const q1 = screen.getByText("¿Necesito saber de tecnología?");
    expect(q1).toBeInTheDocument();

    // Answer to Q1 should be visible
    expect(screen.getAllByRole("button")).toHaveLength(6);
    const a1 = screen.getByText(/pensada para autónomos y pymes sin perfil tecnológico/i);
    expect(a1).toBeInTheDocument();

    // Click q2 to open it
    const q2 = screen.getByText("¿Las sesiones son online?");
    fireEvent.click(q2);

    // Q2 answer becomes visible (testing presence in document)
    const a2 = screen.getByText(/Todas las sesiones son online, por videollamada/i);
    expect(a2).toBeInTheDocument();
  });
});
